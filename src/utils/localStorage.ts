import { Repo } from '../services/githubService'

const saveDataToLocalStorage = ({ key, data }: { key: string; data: Repo }) => {
  try {
    const serializedData = JSON.stringify([data])
    localStorage.setItem(key, serializedData)
  } catch (error) {
    console.error('Error saving data to local storage:', error)
  }
}
const updateDataToLocalStorage = ({ key, data }: { key: string; data: Repo }) => {
  try {
    const currentData = JSON.parse(localStorage.getItem(key) as string)
    let serializedData
    if (currentData && currentData?.length) {
      serializedData = JSON.stringify([...currentData, data])
    } else {
      serializedData = JSON.stringify([data])
    }
    localStorage.setItem(key, serializedData)
  } catch (error) {
    console.error('Error updating data to local storage:', error)
  }
}

const deleteDataToLocalStorage = ({ key, id }: { key: string; id: number }) => {
  try {
    let currentData = JSON.parse(localStorage.getItem(key) as string)
    if (currentData && currentData?.length) {
      currentData = currentData.filter((cd: Repo) => cd.id != id)
      const serializedData = JSON.stringify(currentData)
      localStorage.setItem(key, serializedData)
    }
  } catch (error) {
    console.error('Error deleting data to local storage:', error)
  }
}

const getDataFromLocalStorage = ({ key }: { key: string }) => {
  try {
    const currentData = JSON.parse(localStorage.getItem(key) as string)
    if (currentData && currentData?.length) {
      return currentData
    }
  } catch (error) {
    console.error('Error deleting data to local storage:', error)
    return []
  }
}

export {
  saveDataToLocalStorage,
  updateDataToLocalStorage,
  deleteDataToLocalStorage,
  getDataFromLocalStorage,
}
