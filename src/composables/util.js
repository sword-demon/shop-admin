import { ElNotification, ElMessageBox } from 'element-plus'
import nProgress from 'nprogress'

export function showModal(content = '提示内容', type = 'warning', title = '') {
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

// 显示全局loading
export function showFullLoading() {
    nProgress.start()
}

// 隐藏全局loading
export function hideFullLoading() {
    nProgress.done()
}
