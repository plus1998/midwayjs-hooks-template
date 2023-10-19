<script lang="ts" setup>
import { message } from "ant-design-vue";
import { reactive, ref } from "vue";
import { info, register, changePassword } from "../../api/user.api";
import { User } from "../../api/entity/user";

const user = ref({} as User);

const userInfo = async () => {
    const { data } = await info();
    user.value = data;
};
userInfo();

// 注册用户
const form = reactive({
    username: '',
    password: '',
})
const isShowRegisterUser = ref(false)
const onRegisterUser = async () => {
    const ret = await register(
        form.username,
        form.password,
    );
    isShowRegisterUser.value = false
    if (!ret.success) {
        message.error(ret.message)
        return
    } else {
        message.success(`【${ret.data.username}】注册成功`)
    }
}

// 修改密码
const isShowModifyPass = ref(false)
const passwordForm = reactive({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
})
const onModifyPass = async () => {
    // 检查两次密码一致
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
        message.error('两次密码不一致')
        return
    }
    const ret = await changePassword(passwordForm.password, passwordForm.newPassword);
    isShowModifyPass.value = false
    if (!ret.success) {
        message.error(ret.message)
        return
    } else {
        message.success(`修改成功`)
    }
}
</script>

<template>
    <div>
        <a-button class="my-3" type="primary" @click="isShowModifyPass = true">修改密码</a-button>
        <a-button v-if="user.role === 'admin'" class="my-3 ml-3" type="primary"
            @click="isShowRegisterUser = true">注册账号</a-button>
        <!-- 注册弹窗 -->
        <a-modal v-model:open="isShowRegisterUser" title="注册新用户" ok-text="注册" cancel-text="取消" @ok="onRegisterUser">
            <a-form class="p-5" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off">
                <a-form-item label="用户名" required>
                    <a-input v-model:value="form.username"></a-input>
                </a-form-item>
                <a-form-item label="密码" required>
                    <a-input v-model:value="form.password"></a-input>
                </a-form-item>
            </a-form>
        </a-modal>
        <!-- 修改密码弹窗 -->
        <a-modal v-model:open="isShowModifyPass" title="修改密码" ok-text="修改" cancel-text="取消" @ok="onModifyPass">
            <a-form class="p-5" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off">
                <a-form-item label="旧密码" required>
                    <a-input v-model:value="passwordForm.password"></a-input>
                </a-form-item>
                <a-form-item label="新密码" required>
                    <a-input v-model:value="passwordForm.newPassword"></a-input>
                </a-form-item>
                <a-form-item label="确认密码" required>
                    <a-input v-model:value="passwordForm.confirmNewPassword"></a-input>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>