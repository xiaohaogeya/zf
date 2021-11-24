// import axios from "axios";
import {getAreaInfoApi} from "../service/api";

export const getCurrentCity = () => {

    // 判断localStorage中是否有定位城市
    const localCity = JSON.parse(localStorage.getItem('hkzf_city'))

    if (!localCity){
        // 使用获取城市定位的代码来获取城市并存储在本地存储中
        return new Promise((resolve, reject) => {
            // 通过IP定位获取当前城市名称
            const curCity = new window.BMap.LocalCity()
            curCity.get(async res => {
                try {
                    const result = await getAreaInfoApi({name: res.name})
                    // 存入本地缓存
                    localStorage.setItem('hkzf_city', JSON.stringify(result.data.body))
                    resolve(result.data.body)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    // 此处也应该返回Promise，返回值统一
    return Promise.resolve(localCity)
}


// import axios from "../service/config";
//
// export const getCurrentCity = () => {
//
//     // 判断localStorage中是否有定位城市
//     const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
//
//     // if (!localCity){
//         // 使用获取城市定位的代码来获取城市并存储在本地存储中
//         return new Promise((resolve, reject) => {
//             // 通过IP定位获取当前城市名称
//             const curCity = new window.BMap.LocalCity()
//             curCity.get(async res => {
//                 try {
//                     const result = await axios.get('area/info', {
//                         params: {
//                             name: res.name
//                         }
//                     })
//                     console.log(result)
//                     // 存入本地缓存
//                     localStorage.setItem('hkzf_city', JSON.stringify(result.data.body))
//                     resolve(result.data.body)
//                 } catch (e) {
//                     reject(e)
//                 }
//             })
//         })
//     // }
//
//     // 此处也应该返回Promise，返回值统一
//     return Promise.resolve(localCity)
// }

// export const getCurrentCity = () => {

//     // 判断localStorage中是否有定位城市
//     const localCity = JSON.parse(localStorage.getItem('hkzf_city'))

//     // if (!localCity){
//         // 使用获取城市定位的代码来获取城市并存储在本地存储中
//         // 通过IP定位获取当前城市名称
//         const curCity = new window.BMap.LocalCity()
//         curCity.get(async res => {
//             try {
//                 const result = await axios.get(`${ApiUrl}/area/info`, {
//                     params: {
//                     name: res.name
//                     }
//                 }).then((resu)=> console.log("res", resu)).catch((err) => console.log("er", err.response.data))
//                 console.log('成功回调-->', result);
//                 // 存入本地缓存
//                 localStorage.setItem('hkzf_city', JSON.stringify(result.data.body))
//                 return result.data.body
//             } catch (e) {
//                 console.log('错误回调-->', e);
//                 return e
//             }
//         })
//         // }
    

//     return localCity
// }



