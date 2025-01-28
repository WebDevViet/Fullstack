const formatMessageResponse = (input: string): string => {
  const firstCharacter = input.trim()[0]

  if (firstCharacter === firstCharacter.toUpperCase()) {
    // Loại bỏ phần chuỗi trong dấu ()
    return input.replace(/\(.*?\)/, '').trim()
  }

  // Tìm và lấy nội dung trong dấu ngoặc đơn
  const match = input.match(/\(([^)]+)\)/)
  const contentInParentheses = match ? match[1] : ''

  // Loại bỏ phần trong dấu ngoặc đơn và từ 'jwt'
  const cleanedString = input
    .replace(/\(.*?\)/, '')
    .replace(/jwt/gi, '')
    .trim()

  // Kết hợp lại nội dung đã xử lý
  return `${contentInParentheses} ${cleanedString}`.trim()
}

export default formatMessageResponse
