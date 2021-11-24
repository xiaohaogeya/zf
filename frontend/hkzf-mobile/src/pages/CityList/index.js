import React from "react"
import {Toast} from 'antd-mobile';
import {List, AutoSizer} from 'react-virtualized';
import {getCityListApi, getAreaHotApi} from "../../service/api";
import { getCurrentCity } from "../../utils";
import NavHeader from "../../components/NavHeader"

import styles from "./index.module.css"

// 索引的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50
// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '深圳', '广州']


// 格式化城市数据
const formatCityData = list => {
    const cityList = {}

    // 遍历数组
    list.forEach(item => {
        // 获取每个城市的首字母
        const first = item.short.substr(0, 1)
        
        if (cityList[first]){
            cityList[first].push(item)
        } else {
            cityList[first] = [item]
        }
    })

    // 获取索引数据
    const cityIndex = Object.keys(cityList).sort()

    return {
        cityList,
        cityIndex
    }
}

// 封装处理字母索引的方法
const formatCityIndex = letter => {
    switch (letter) {
        case '#':
            return '当前定位'
        case 'hot':
            return '热门城市'
        default:
            return letter.toUpperCase()
    }
}


export default class CityList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            cityIndex: [],
            cityList: {},
            activeIndex: 0
        }

        this.cityListComponent = React.createRef()
    }
    

    // 获取城市列表
    async getCityList(){
        const res = await getCityListApi( {
            level: 1
        })

        const {cityIndex, cityList} = formatCityData(res.data.body)

        // 热门城市数据
        const hotRes = await getAreaHotApi()

        cityList['hot'] = hotRes.data.body
        cityIndex.unshift('hot')

        const curCity = await getCurrentCity()
        cityList['#'] = [curCity]
        cityIndex.unshift('#')

        this.setState(()=>{
            return {
                cityList,
                cityIndex
            }
        })
        return {cityIndex, cityList}

    }

    getRowHeight = ({index}) => {
        // 索引标题高度 + 城市数量 * 每一个城市高度
        const {cityIndex, cityList} = this.state
        return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    }

    rowRenderer = ({
        key, // Unique key within array of rows
        index, // 索引号
        isScrolling, // 当前项是否正在滚动中
        isVisible, // 当前项在List中是可见的
        style, // 注意：重点属性，一定要给每一换行添加该样式！ 作用：指定每一会的位置
      }) => {
        const {cityIndex, cityList} = this.state
        const letter = cityIndex[index]
        return (
          <div key={key} style={style} >
            <div className={styles.cityTitle}>{formatCityIndex(letter)}</div>
            {cityList[letter].map(item => <div className={styles.cityName} key={item.value} onClick={() => this.changeCity(item)}>{item.label}</div>)}
          </div>
        );
      }
    
      onRowsRendered = ({startIndex}) => {
        if (this.state.activeIndex !== startIndex){
            this.setState(()=> {
                return {
                    activeIndex: startIndex
                }
            })
        }
      }  
    
    // 渲染右侧索引方法
    renderCityIndex(){
        const {cityIndex, activeIndex} = this.state
        return cityIndex.map((item, index) => (
            <li className={styles.cityIndexItem} key={item} onClick={()=>{
                this.cityListComponent.current.scrollToRow(index)
            }}>
                <span className={ activeIndex === index ? styles.indexActive : ''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
            </li>
        ))
    }

    async componentDidMount(){
        const {cityIndex} = await this.getCityList()

        // 调用measureAllRows ，提前计算List中每一行的高度，实现scrollToRow的精确跳转
        // 注意：调用这个方法需要保证List组件中已经有数据了！如果List组件中数据为空，就会报错
        // 解决：只要保证这个方法是在 获取数据之后 调用即可
        if (cityIndex.length > 0){
            this.cityListComponent.current.measureAllRows()
        }
    }

    changeCity({label, value}){
        // 有房源信息
        if(HOUSE_CITY.indexOf(label) > -1){
            localStorage.setItem('hkzf_city', JSON.stringify({label, value }))
            this.props.history.go(-1)
        } else {
            Toast.info('该地区暂无房源信息', 1, null, false)
        }
    }

    render() {
        return (
            <div className={styles.cityList}>
                {/* 顶部导航栏*/}
                <NavHeader>城市选择</NavHeader>

                {/*城市列表*/}
                <AutoSizer>
                    {
                        ({width, height}) =>  <List
                        width={width}
                        height={height}
                        rowCount={this.state.cityIndex.length}
                        rowHeight={this.getRowHeight}
                        rowRenderer={this.rowRenderer}
                        onRowsRendered={this.onRowsRendered}
                        ref={this.cityListComponent}
                        scrollToAlignment="start"
                    />
                    }
                </AutoSizer>

                {/* 右侧索引列表*/}
                <ul className={styles.cityIndex}>
                    {this.renderCityIndex()}
                </ul>


            </div>
        )
    }
}


