import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import th from '../locales/th.json'
import la from '../locales/la.json'


 export default defineNuxtPlugin(({ vueApp }) => {
   const i18n = createI18n({
     legacy: false,
     globalInjection: true,
     locale: 'la',
     messages: {
      en,
      th,
      la
     }
   })

   vueApp.use(i18n)
 })

//  const obj = [
//   {
//     dlt_code: "A",
//     dlt_description:
//       "ใบอนุญาตขับรถประเภท A รถจักรยานยนต์สองล้อ เครื่องยนต์ไม่เกิน 125 cc.",
//   },
//   {
//     dlt_code: "A1",
//     dlt_description:
//       "ใบอนุญาตขับรถประเภท A1 รถจักรยานยนต์สองล้อ เครื่องยนต์ 125 cc. ขึ้นไป",
//   },
//   {
//     dlt_code: "A2",
//     dlt_description:
//       "ใบอนุญาตขับรถประเภท A2 รถสามล้อส่วนตัว, รถสองล้อ และรถสามล้อโดยสาร",
//   },
//   {
//     dlt_code: "A3",
//     dlt_description:
//       "ใบอนุญาตขับรถประเภท A3 รถแทรกเตอร์แบบมีล้อ และรถปราบดิน",
//   },
//   {
//     dlt_code: "B",
//     dlt_description:
//       "ใบอนุญาตขับรถประเภท B รถยนต์ที่น้าหนักรวมน้อยกว่า 3,500 กิโลกรัม ไม่เกิน 9 ที่นั่ง รวมผู้ขับรถ",
//   },
//   {
//     dlt_code: "C",
//     dlt_description:
//       "ใบอนุญาตขับรถประเภท C รถขนส่งสินค้าน้าหนักรวมตั้งแต่ 3,500 ถึง 7,500 กิโลกรัม",
//   },
//   {
//     dlt_code: "C1",
//     dlt_description:
//       "ใบอนุญาตขับรถประเภท C1 รถขนส่งสินค้าน้าหนักรวมตั้งแต่ 7,500 ถึง 15,000 กิโลกรัม",
//   },
//   {
//     dlt_code: "C2",
//     dlt_description:
//       "ใบอนุญาตขับรถประเภท C2 รถขนส่งสินค้า น้าหนักรวม 15,000 กิโลกรัม ขึ้นไป",
//   },
//   {
//     dlt_code: "D",
//     dlt_description:
//       "ใบอนุญาตขับรถประเภท D รถขนส่งผู้โดยสาร ประเภท 4 ล้อขึ้นไป ไม่เกิน 15 ที่นั่ง",
//   },
// ];