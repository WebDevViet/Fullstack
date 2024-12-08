import path from 'node:path'
import { STATUS } from '../constants'

/**
 * Appends a timestamp to a given file name.
 *
 * @param {string} fileName - A file name to which a timestamp should be appended.
 * @returns {string} - The modified file name, with a timestamp appended before the file extension.
 * @throws {Object} - Throws an error with status BAD_REQUEST if the given file name is empty.
 */
export const addTimestampFile = (fileName) => {
  if (fileName === '') {
    throw {
      status: STATUS.BAD_REQUEST,
      response: {
        message: 'File name is empty'
      }
    }
  }

  const fileNameWithoutExtension = path.parse(fileName).name
  const extension = path.parse(fileName).ext
  const newFileName = `${fileNameWithoutExtension}-${Date.now()}${extension}`
  return newFileName
}

/**
 * Appends a timestamp and index to each file name in the given array.
 *
 * @param {string[]} fileNames - An array of file names to which timestamps and indices should be added.
 * @returns {string[]} - An array of modified file names, each with a timestamp and index appended before the file extension.
 * @throws {Object} - Throws an error with status BAD_REQUEST if any file name is empty.
 */
export const addTimestampFiles = (files) => {
  return files.map(({ name: fileName }, index) => {
    if (fileName === '') {
      throw {
        status: STATUS.BAD_REQUEST,
        response: {
          message: 'File name is empty'
        }
      }
    }

    const fileNameWithoutExtension = path.parse(fileName).name
    const extension = path.parse(fileName).ext
    const newFileName = `${fileNameWithoutExtension}-${Date.now()}_${index + 1}${extension}`
    return newFileName
  })
}
