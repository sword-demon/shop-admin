import { ref, reactive } from 'vue'
import { logout, updatepassword } from '~/api/manager'
import { showModal, toast } from '~/composables/util'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export function useRepassword() {
    const store = useStore()
    const router = useRouter()
    const formDrawerRef = ref(null)
    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: '',
    })

    // 定义登录验证规则
    // 必须和上面表单属性一样
    const rules = {
        oldpassword: [
            {
                required: true,
                message: '旧密码不能为空',
                trigger: 'blur',
            },
        ],
        password: [
            {
                required: true,
                message: '新密码不能为空',
                trigger: 'blur',
            },
        ],
        repassword: [
            {
                required: true,
                message: '确认密码不能为空',
                trigger: 'blur',
            },
        ],
    }
    // 让formRef变成响应式
    const formRef = ref(null)
    const onSubmit = () => {
        formRef.value.validate(valid => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            updatepassword(form)
                .then(res => {
                    toast('修改密码成功，请重新登录')
                    store.dispatch('logout')
                    // 跳转回登录页
                    router.push('/login')
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading()
                })
        })
    }

    const openRePasswordForm = () => formDrawerRef.value.open()

    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordForm,
    }
}

export function useLogout() {
    const store = useStore()
    const router = useRouter()
    function handleLogout() {
        showModal('是否要退出登录?').then(res => {
            // console.log("退出登录");
            logout().finally(() => {
                // 不管成功，都要到这
                store.dispatch('logout')
                // 跳转回登录
                router.push('/login')
                // 提示退出成功
                toast('退出成功')
            })
        })
    }
    return {
        handleLogout,
    }
}
