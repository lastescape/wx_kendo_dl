const phoneNumber = "13332215921";
const address = "大连国际会议中心内，大连市中山区港浦路3号";
const addressName = "大连国际会议中心";
const addressDetail = "辽宁省大连市中山区港浦路3号";
const openTime = "全天候道场，详细课程安排请点击";
const navInRoom = "会议中心内向导请点击";
const listDataKendo = {
  listData: [
    { "code": "01", "week": "星期六", "timeRanges": "09:00～10:00(儿童课)" },
    { "code": "02", "week": "星期六", "timeRanges": "10:30～12:00" },
    { "code": "03", "week": "星期六", "timeRanges": "18:30～20:00" },
    { "code": "04", "week": "星期日", "timeRanges": "09:00～10:00(儿童课)" },
    { "code": "05", "week": "星期日", "timeRanges": "10:30～12:00" },
    { "code": "06", "week": "星期二", "timeRanges": "14:00～15:30" },
    { "code": "07", "week": "星期二", "timeRanges": "17:30～18:15" },
    { "code": "08", "week": "星期二", "timeRanges": "18:30～20:00" },
    { "code": "09", "week": "星期四", "timeRanges": "14:00～15:30" },
    { "code": "10", "week": "星期四", "timeRanges": "17:30～18:15" },
    { "code": "11", "week": "星期四", "timeRanges": "18:30～20:00" }
  ]
};
const listDataAkido = {
  listData: [
    { "code": "01", "week": "星期六", "timeRanges": "14:00～15:30" },
    { "code": "02", "week": "星期六", "timeRanges": "16:00～17:00(儿童课)" },
    { "code": "03", "week": "星期日", "timeRanges": "16:00～17:00(儿童课)" },
    { "code": "04", "week": "星期日", "timeRanges": "17:00～18:30" },
    { "code": "05", "week": "星期一", "timeRanges": "14:00～15:30" },
    { "code": "06", "week": "星期一", "timeRanges": "17:30～18:15" },
    { "code": "07", "week": "星期一", "timeRanges": "18:30～20:00" },
    { "code": "08", "week": "星期三", "timeRanges": "14:00～15:30" },
    { "code": "09", "week": "星期三", "timeRanges": "16:30～17:30(儿童课)" },
    { "code": "10", "week": "星期三", "timeRanges": "17:30～18:15" },
    { "code": "11", "week": "星期三", "timeRanges": "18:30～20:00" },
    { "code": "12", "week": "星期五", "timeRanges": "14:00～15:30" },
    { "code": "13", "week": "星期五", "timeRanges": "17:30～18:15" },
    { "code": "14", "week": "星期五", "timeRanges": "18:30～20:00" }
  ]
};
const listDataIaido = {
  listData: [
    { "code": "01", "week": "星期日", "timeRanges": "14:00～15:30" }
  ]
};
module.exports = {
  phoneNumber: phoneNumber,
  openTime: openTime,
  listDataKendo: listDataKendo,
  listDataAkido: listDataAkido,
  listDataIaido: listDataIaido,
  address: address,
  addressDetail: addressDetail,
  addressName: addressName,
  navInRoom: navInRoom
}