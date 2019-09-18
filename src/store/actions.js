
//给action注册事件处理函数
export function setUserInfo({commit},userInfo) {
  //提交mutation中的setUserInfo方法
  return commit('setUserInfo',userInfo)
}

export function setIsShowFooterBar({commit},isshow) {
  return commit('setIsShowFooterBar',isshow)
}

export function setProductList({commit},productList) {
  return commit('setProductList',productList)
}

export function setProduct({commit},product) {
  return commit('setProduct',product)
}

export function setKeyword({commit},keyword) {
  return commit('setKeyword',keyword)
}

export function setCategoryId({commit},categoryId) {
  return commit('setCategoryId',categoryId)
}

export function setOrderStatus({commit},orderStatus) {
  return commit('setOrderStatus',orderStatus)
}

export function setJudgeAddress({commit},judgeAddress) {
  return commit('setJudgeAddress',judgeAddress)
}

export function setAddress({commit},address) {
  return commit('setAddress',address)
}

export function setOrderNo({commit},orderNo) {
  return commit('setOrderNo',orderNo)
}
