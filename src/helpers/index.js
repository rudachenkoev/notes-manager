export const convertDateTime = (date) => { //Convert time and date to current timezone
  if (!date) return ''
  const currentDate = new Date(date)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return currentDate.toLocaleString('uk', { timeZone, hour12: false })
}
