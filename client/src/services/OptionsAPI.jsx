// get option lists from api
const getList = async (path) => {
  const response = await fetch(`/api/${path}`)
  return response.json()
}

export const getColors = () => getList('colors')
export const getPatterns = () => getList('patterns')
export const getStickers = () => getList('stickers')
export const getCharms = () => getList('charms')