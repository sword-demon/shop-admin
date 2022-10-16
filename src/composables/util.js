import { ElNotification } from 'element-plus'

// 消息提示
export function toast(message, type = 'success', dangerouslyUseHTMLString = false) {
    ElNotification({
        message: message,
        type: type,
        duration: 3000, // 3秒钟
        dangerouslyUseHTMLString,
    })
}
