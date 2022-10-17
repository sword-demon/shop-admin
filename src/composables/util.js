import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'

export function showModel(content = '提示内容', type = 'warning', title = '') {
    return ElMessageBox.confirm(content, title, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: type,
    })
}

// 消息提示
export function toast(message, type = 'success', dangerouslyUseHTMLString = false) {
    ElNotification({
        message: message,
        type: type,
        duration: 3000, // 3秒钟
        dangerouslyUseHTMLString,
    })
}
