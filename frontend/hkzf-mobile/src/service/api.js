import axios from "./config";

// ip地址
export const getBaseUrl = () => {
    return axios.defaults.baseURL
}
// 获取城市列表
export const getCityListApi = params => {
    return axios.get('area/city', {
        params
    })
}

// 获取轮播图数据的方法
export const getSwiperApi = () => {
    return axios.get(`home/swiper`)
}

// 获取租房小组数据的方法
export const getGroupsApi = async params => {
    return await axios.get(`home/groups`, {
        params
    })
}

// 获取最新资讯
export const getNewsApi = params => {
    return  axios.get(
        `home/news`, {
            params
        })
}

// 获取城市信息
export const getAreaInfoApi = params => {
    return axios.get(`/area/info`, {params})
}

// 热门城市
export const getAreaHotApi = () => {
    return axios.get('/area/hot')
}

