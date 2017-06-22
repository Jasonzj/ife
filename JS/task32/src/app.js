import './css/style.scss'
import { FormFactory } from './js/formFactory'

const form1 = {
    name: {
        id: 'username',
        label: '姓名',
        type: 'text',
        validators: ['isNowEmpty', 'lengthBetween:4:16'],
        success: '姓名格式输入正确',
        fail: ['名称不能为空', '名称格式有误']
    },
    password: {
        id: 'password',
        label: '密码',
        type: 'text',
        validators: ['isNowEmpty', 'lengthBetween:4:16'],
        success: '密码可用',
        fail: ['密码不能为空', '密码格式有误']
    },
    passwordMore: {
        id: 'passwordMore',
        label: '密码确认',
        type: 'text',
        validators: ['isNowEmpty', 'isSame'],
        success: '密码一致',
        fail: ['不能为空', '密码不一致'],
        compare: 'password'
    },
    phone: {
        id: 'phone',
        label: '手机',
        type: 'text',
        validators: ['isNowEmpty', 'isMobile'],
        success: '手机号码格式输入正确',
        fail: ['手机号码不能为空', '手机格式有误']
    },
    phone2: {
        id: 'phone2',
        label: '备用手机',
        type: 'text',
        validators: ['isEmpty'],
        success: '格式输入正确',
        fail: ['手机号码不能为空']
    },
    submit: {
        id: 'validate1',
        value: '验证',
        type: 'button',
        fail: '提交失败',
        success: '提交成功'
    }
}

new FormFactory(form1, '.box')
