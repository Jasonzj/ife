/*
 * @Author: Jason 
 * @Date: 2017-06-23 11:26:25 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-09-14 22:31:01
 */

import './css/style.scss'
import { FormFactory } from './js/formFactory'

const form1 = {
    id: 'form',
    class: 'from',
    action: '##',
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
        fail: ['密码不能为空', '密码格式有误'],
        linkage: 'passwordMore'
    },
    passwordMore: {
        id: 'passwordMore',
        label: '密码确认',
        type: 'text',
        validators: ['isNowEmpty', 'isSame'],
        success: '密码一致',
        fail: ['不能为空', '密码不一致'],
        compare: 'password',
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
        fail: ['手机号码不能为空'],
        noMust: true
    },
    submit: {
        id: 'validate1',
        value: '验证',
        type: 'button',
        fail: '提交失败，请检查输入',
        success: '提交成功'
    }
}

const form2 = {
    id: 'form2',
    class: 'from2',
    action: '##',
    name: {
        id: 'username',
        label: '姓名',
        type: 'text',
        validators: ['isNowEmpty', 'lengthBetween:4:12'],
        success: '姓名格式输入正确',
        fail: ['名称不能为空', '名称格式有误']
    },
    password: {
        id: 'password2',
        label: '密码',
        type: 'text',
        validators: ['isNowEmpty', 'lengthBetween:4:16'],
        success: '密码可用',
        fail: ['密码不能为空', '密码格式有误'],
        linkage: 'passwordMore2'
    },
    passwordMore: {
        id: 'passwordMore2',
        label: '密码确认',
        type: 'text',
        validators: ['isNowEmpty', 'isSame'],
        success: '密码一致',
        fail: ['不能为空', '密码不一致'],
        compare: 'password2',
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
        fail: ['手机号码不能为空'],
        noMust: true
    },
    submit: {
        id: 'validate1',
        value: '验证',
        type: 'button',
        fail: '提交失败，请检查输入',
        success: '提交成功'
    }
}

new FormFactory(form1, '.from__box')
new FormFactory(form2, '.from__box2')
