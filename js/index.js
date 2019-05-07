var items = []

$.ajax({
  url: "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=5",
  method: "GET",
  dataType: "JSON",
  error: function(){
    console.log("載入失敗")
  },
  success: function(res){
    console.log(res)
    items = res
    $(".row#eventItems").html("")
    for (i=0;i<=items.length;i++){
      var item=`<div data-id='${i}' class='col-xl-4 col-md-6'><div class='itemsBox'><h2>${items[i].title}</h2><p class='eventsLocation'>${items[i].showInfo[0].locationName}</p><p class='eventsTime'>${items[i].showInfo[0].time}</p></div></div>`
      
      var itemEl = $(item)
      itemEl.click(function(){
        var selectedId = $(this).attr("data-id")
        console.log(selectedId)
        updateSelect(selectedId)
        $("#item").addClass("selectItem")
        $(".selectItemBox").show()
    })
    $(".row#eventItems").append(itemEl)
    
    }
}});


function updateSelect(id){
  var content=`
  <button onclick='closeItem()' class='close'>ｘ</button>
  <div class='row'>
    <div class='showTitle col-sm-12'>${items[id].title}</div></div>
  <div class='row imgAndInfo'>
    <img src='${items[id].imageUrl}' class='col-lg-6 col-md-12 showImg'>
    <div class='showInfoArea col-lg-6 col-md-12'>
      <div class='showInfo'>演出單位：${items[id].showUnit}</div>
      <div class='showInfo'>演出地點：${items[id].showInfo[0].locationName}</div>
      <div class='showInfo'>地址：${items[id].showInfo[0].location}</div>
      <div class='showInfo'>演出時間：${items[id].showInfo[0].time}</div>
      <div class='showInfo'>票價：${items[id].showInfo[0].price}</div>
      <div class='showInfo'>售票網址：<a href='${items[id].webSales}'>點我前往</a></div>
    </div>
  </div>
  <div class='row itemDescription'>${items[id].descriptionFilterHtml}</div>

  `
  $(".selectItem").html(content)
}


function closeItem(){
  $(".selectItemBox").hide()
}