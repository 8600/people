
    window.ozzx = {
      script: {}
    };
    var globalConfig = {"root":"/src","entry":"home","headFolder":"head","outFolder":"dist","autoPack":true,"minifyCss":false,"minifyJs":false,"pageFolder":"page"};
  // 获取URL #后面内容
function getarg(url){
  arg = url.split("#");
  return arg[1];
}

// 页面资源加载完毕事件
window.onload = function() {
  // 取出URL地址判断当前所在页面
  var pageArg = getarg(window.location.href)
  // 从配置项中取出程序入口
  var page = pageArg ? pageArg : globalConfig.entry
  if (page) {
    var entryDom = document.getElementById('ox-' + page)
    if (entryDom) {
      // 显示主页面
      entryDom.style.display = 'block'
      window.ozzx.activePage = page
      runPageFunction(page, entryDom)
    } else {
      console.error('入口文件设置错误!')
    }
  } else {
    console.error('未设置程序入口!')
  }
}

// ozzx-name处理
function pgNameHandler (dom) {
  // 遍历每一个DOM节点
  for (var i = 0; i < dom.children.length; i++) {
    var tempDom = dom.children[i]
    // 判断是否存在@name属性
    var pgName = tempDom.attributes['@name']
    if (pgName) {
      // console.log(pgName.textContent)
      window.ozzx.domList[pgName.textContent] = tempDom
    }
    // 判断是否有点击事件
    var clickFunc = tempDom.attributes['@click']
    
    if (clickFunc) {
      
      tempDom.onclick = function() {
        var clickFor = clickFunc.textContent
        // 判断页面是否有自己的方法
        var newPageFunction = window.ozzx.script[window.ozzx.activePage]
        
        // 取出参数
        var parameterArr = []
        var parameterList = clickFor.match(/[^\(\)]+(?=\))/g)
        if (parameterList && parameterList.length > 0) {
          // 参数列表
          parameterArr = parameterList[0].split(',')
          clickFor = clickFor.replace('(' + parameterList + ')', '')
        }
        
        // 如果有方法,则运行它
        if (newPageFunction.methods[clickFor]) {
          // 绑定window.ozzx对象
          // console.log(tempDom)
          newPageFunction.methods[clickFor].apply({
            $el: tempDom,
            activePage: window.ozzx.activePage,
            domList: window.ozzx.domList,
            data: window.ozzx.script[window.ozzx.activePage].data,
            methods: window.ozzx.script[window.ozzx.activePage].methods
          }, parameterArr)
        }
      }
    }
    // 递归处理所有子Dom结点
    if (tempDom.children.length > 0) {
      pgNameHandler(tempDom)
    }
  }
}

// 运行页面所属的方法
function runPageFunction (pageName, entryDom) {
  // ozzx-name处理
  window.ozzx.domList = {}
  pgNameHandler(entryDom)

  // 判断页面是否有自己的方法
  var newPageFunction = window.ozzx.script[pageName]
  // 如果有方法,则运行它
  if (newPageFunction) {
    newPageFunction.created.apply(window.ozzx)
  }
}


// url发生改变事件
window.onhashchange = function(e) {
  var oldUrlParam = getarg(e.oldURL)
  var newUrlParam = getarg(e.newURL)
  // 查找页面跳转前的page页(dom节点)
  // console.log(oldUrlParam)
  // 如果源地址获取不到 那么一般是因为源页面为首页
  if (oldUrlParam === undefined) {
    oldUrlParam = globalConfig.entry
  }
  var oldDom = document.getElementById('ox-' + oldUrlParam)
  if (oldDom) {
    // 隐藏掉旧的节点
    oldDom.style.display = 'none'
  }
  // 查找页面跳转后的page
  
  var newDom = document.getElementById('ox-' + newUrlParam)
  // console.log(newDom)
  if (newDom) {
    // 隐藏掉旧的节点
    newDom.style.display = 'block'
  } else {
    console.error('页面不存在!')
    return
  }
  window.ozzx.activePage = newUrlParam
  runPageFunction(newUrlParam, entryDom)
}

      window.ozzx.script = {home:{created:function created(){var swiper=new Swiper('#auto-swiper',{autoplay:3000,slidesPerView:3,spaceBetween:20,nextButton:'#swiper-button-next-auto',prevButton:'#swiper-button-prev-auto'});var swiper2=new Swiper('#swiper',{slidesPerView:3,spaceBetween:20,nextButton:'#swiper-button-next',prevButton:'#swiper-button-prev'});},data:{peopleList:[{image:"./image/people1.png",viewpoint:"观点观点观点观点观点观点",identity:"中国建筑材料 <br>集团有限公司 <br>董事长 <br>宋志平",transform:"translate(-395px, 0)",identityStyle:"left: -160px;top: 30px;"},{image:"./image/people1.png",viewpoint:"观点观点观点观点观点观点",identity:"中国建筑材料 <br>集团有限公司 <br>董事长 <br>宋志平",transform:"translate(-345px, -219px)",identityStyle:"left: -160px;top: 30px;"},{image:"./image/people1.png",viewpoint:"观点观点观点观点观点观点",identity:"中国建筑材料 <br>集团有限公司 <br>董事长 <br>宋志平",transform:"translate(-140px, -378px)",identityStyle:"left: -160px;top: 30px;"},{image:"./image/people1.png",viewpoint:"观点观点观点观点观点观点",identity:"中国建筑材料 <br>集团有限公司 <br>董事长 <br>宋志平",transform:"translate(140px, -378px)",identityStyle:"left: 160px;top: 30px;"},{image:"./image/people1.png",viewpoint:"观点观点观点观点观点观点",identity:"中国建筑材料 <br>集团有限公司 <br>董事长 <br>宋志平",transform:"translate(345px, -219px)",identityStyle:"left: 160px;top: 30px;"},{image:"./image/people1.png",viewpoint:"观点观点观点观点观点观点",identity:"中国建筑材料 <br>集团有限公司 <br>董事长 <br>宋志平",transform:"translate(395px, 0)",identityStyle:"left: 160px;top: 30px;"},{image:"./image/people1.png",viewpoint:"观点观点观点观点观点观点",identity:"中国建筑材料 <br>集团有限公司 <br>董事长 <br>宋志平",transform:"translate(345px, 219px)",identityStyle:"left: 160px;top: 30px;"},{image:"./image/people1.png",viewpoint:"观点观点观点观点观点观点",identity:"中国建筑材料 <br>集团有限公司 <br>董事长 <br>宋志平",transform:"translate(-140px, 378px)",identityStyle:"left: -160px;top: 30px;"},{image:"./image/people1.png",viewpoint:"观点观点观点观点观点观点",identity:"中国建筑材料 <br>集团有限公司 <br>董事长 <br>宋志平",transform:"translate(140px, 378px)",identityStyle:"left: 160px;top: 30px;"},{image:"./image/people1.png",viewpoint:"观点观点观点观点观点观点",identity:"中国建筑材料 <br>集团有限公司 <br>董事长 <br>宋志平",transform:"translate(-345px, 219px)",identityStyle:"left: -160px;top: 30px;"}],speakBox:[{image:"./image/people-big.png",title:"陈坛根讲述龙泉青瓷陈坛根讲述龙泉青瓷陈坛",text:"      我国将出现今冬以来范围最广、持续时间最长、影响最为严重的低温雨雪冰冻天气过程其中陕西河南安徽江等6省部分地区有暴雪，局部大暴雪，局地积雪可达40厘米以上 同时23-26日，中东部中央气黄色预警我国将出部大部气温普遍下降6-8℃中央气象台2中央气象台中央气象台中央气象台中央气象台中央气象台中央气象台中央气日06时发布暴雪黄色预警。"},{image:"./image/people-big.png",title:"陈坛根讲述龙泉青瓷陈坛根讲述龙泉青瓷陈坛",text:"      我国将出现今冬以来范围最广、持续时间最长、影响最为严重的低温雨雪冰冻天气过程其中陕西河南安徽江等6省部分地区有暴雪，局部大暴雪，局地积雪可达40厘米以上 同时23-26日，中东部中央气黄色预警我国将出部大部气温普遍下降6-8℃中央气象台2中央气象台中央气象台中央气象台中央气象台中央气象台中央气象台中央气日06时发布暴雪黄色预警。"},{image:"./image/people-big.png",title:"陈坛根讲述龙泉青瓷陈坛根讲述龙泉青瓷陈坛",text:"      我国将出现今冬以来范围最广、持续时间最长、影响最为严重的低温雨雪冰冻天气过程其中陕西河南安徽江等6省部分地区有暴雪，局部大暴雪，局地积雪可达40厘米以上 同时23-26日，中东部中央气黄色预警我国将出部大部气温普遍下降6-8℃中央气象台2中央气象台中央气象台中央气象台中央气象台中央气象台中央气象台中央气日06时发布暴雪黄色预警。"},{image:"./image/people-big.png",title:"陈坛根讲述龙泉青瓷陈坛根讲述龙泉青瓷陈坛",text:"      我国将出现今冬以来范围最广、持续时间最长、影响最为严重的低温雨雪冰冻天气过程其中陕西河南安徽江等6省部分地区有暴雪，局部大暴雪，局地积雪可达40厘米以上 同时23-26日，中东部中央气黄色预警我国将出部大部气温普遍下降6-8℃中央气象台2中央气象台中央气象台中央气象台中央气象台中央气象台中央气象台中央气日06时发布暴雪黄色预警。"},{image:"./image/people-big.png",title:"陈坛根讲述龙泉青瓷陈坛根讲述龙泉青瓷陈坛",text:"      我国将出现今冬以来范围最广、持续时间最长、影响最为严重的低温雨雪冰冻天气过程其中陕西河南安徽江等6省部分地区有暴雪，局部大暴雪，局地积雪可达40厘米以上 同时23-26日，中东部中央气黄色预警我国将出部大部气温普遍下降6-8℃中央气象台2中央气象台中央气象台中央气象台中央气象台中央气象台中央气象台中央气日06时发布暴雪黄色预警。"},{image:"./image/people-big.png",title:"陈坛根讲述龙泉青瓷陈坛根讲述龙泉青瓷陈坛",text:"      我国将出现今冬以来范围最广、持续时间最长、影响最为严重的低温雨雪冰冻天气过程其中陕西河南安徽江等6省部分地区有暴雪，局部大暴雪，局地积雪可达40厘米以上 同时23-26日，中东部中央气黄色预警我国将出部大部气温普遍下降6-8℃中央气象台2中央气象台中央气象台中央气象台中央气象台中央气象台中央气象台中央气日06时发布暴雪黄色预警。"},{image:"./image/people-big.png",title:"陈坛根讲述龙泉青瓷陈坛根讲述龙泉青瓷陈坛",text:"      我国将出现今冬以来范围最广、持续时间最长、影响最为严重的低温雨雪冰冻天气过程其中陕西河南安徽江等6省部分地区有暴雪，局部大暴雪，局地积雪可达40厘米以上 同时23-26日，中东部中央气黄色预警我国将出部大部气温普遍下降6-8℃中央气象台2中央气象台中央气象台中央气象台中央气象台中央气象台中央气象台中央气日06时发布暴雪黄色预警。"},{image:"./image/people-big.png",title:"陈坛根讲述龙泉青瓷陈坛根讲述龙泉青瓷陈坛",text:"      我国将出现今冬以来范围最广、持续时间最长、影响最为严重的低温雨雪冰冻天气过程其中陕西河南安徽江等6省部分地区有暴雪，局部大暴雪，局地积雪可达40厘米以上 同时23-26日，中东部中央气黄色预警我国将出部大部气温普遍下降6-8℃中央气象台2中央气象台中央气象台中央气象台中央气象台中央气象台中央气象台中央气日06时发布暴雪黄色预警。"},{image:"./image/people-big.png",title:"陈坛根讲述龙泉青瓷陈坛根讲述龙泉青瓷陈坛",text:"      我国将出现今冬以来范围最广、持续时间最长、影响最为严重的低温雨雪冰冻天气过程其中陕西河南安徽江等6省部分地区有暴雪，局部大暴雪，局地积雪可达40厘米以上 同时23-26日，中东部中央气黄色预警我国将出部大部气温普遍下降6-8℃中央气象台2中央气象台中央气象台中央气象台中央气象台中央气象台中央气象台中央气日06时发布暴雪黄色预警。"},{image:"./image/people-big.png",title:"陈坛根讲述龙泉青瓷陈坛根讲述龙泉青瓷陈坛",text:"      我国将出现今冬以来范围最广、持续时间最长、影响最为严重的低温雨雪冰冻天气过程其中陕西河南安徽江等6省部分地区有暴雪，局部大暴雪，局地积雪可达40厘米以上 同时23-26日，中东部中央气黄色预警我国将出部大部气温普遍下降6-8℃中央气象台2中央气象台中央气象台中央气象台中央气象台中央气象台中央气象台中央气日06时发布暴雪黄色预警。"}],swiperList1:[{image:"./image/people-big.png",title:"标题文字 标题文字 标题文字 标题文字"},{image:"./image/people-big.png",title:"标题文字 标题文字 标题文字 标题文字"},{image:"./image/people-big.png",title:"标题文字 标题文字 标题文字 标题文字"},{image:"./image/people-big.png",title:"标题文字 标题文字 标题文字 标题文字"},{image:"./image/people-big.png",title:"标题文字 标题文字 标题文字 标题文字"},{image:"./image/people-big.png",title:"标题文字 标题文字 标题文字 标题文字"},{image:"./image/people-big.png",title:"标题文字 标题文字 标题文字 标题文字"}],videoList:["0","0","0","0","0","0","0","0","0","0","0","0"]},methods:{toTop:function toTop(){var timer=setInterval(function(){var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;var ispeed=Math.floor(-scrollTop/3);if(scrollTop==0){clearInterval(timer);}document.documentElement.scrollTop=document.body.scrollTop=scrollTop+ispeed;},30);}}}}
    