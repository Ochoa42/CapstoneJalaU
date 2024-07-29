export function isDateTomorrowYesterdayFutureOrPast(date) {
    const now = new Date();
    const today = now.getDate();
    const dateDay = date.getDate();
  
    if (dateDay - 1 === today) {
      return "Tomorrow";
    } else if (dateDay + 1 === today) {
      return "Yesterday";
    } else if (dateDay > today) {
      return "Future";
    } else {
      return "Past";
    }
  }


const  date = new Date(2024, 7,22)
  console.log(isDateTomorrowYesterdayFutureOrPast(date))
const date1 = new Date(2024, 7,27)
  console.log(isDateTomorrowYesterdayFutureOrPast(date1))
const date2 = new Date(2024, 7,28)
  console.log(isDateTomorrowYesterdayFutureOrPast(date2))
const date3 = new Date(2024, 7,29)
  console.log(isDateTomorrowYesterdayFutureOrPast(date3))
const date4 = new Date(2024, 7,30)
  console.log(isDateTomorrowYesterdayFutureOrPast(date4))