<template>
    <div class="index">
        <Form :model="formItem" :label-width="80" class='formWrapper'>
            <Form-item label="文章标题：">
                <Input v-model="formItem.input" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="内容：">
                <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click='handleAdd'>确定</Button>
                <Button type="ghost" style="margin-left: 8px">取消</Button>
            </Form-item>
        </Form>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'addArticle',
    data () {
        return {
            formItem: {
                input: '',
                select: '',
                radio: 'male',
                checkbox: [],
                switch: true,
                date: '',
                time: '',
                slider: [20, 50],
                textarea: ''
            }
        }
    },
    created(){
        this.init();
        setTimeout(()=>{
            console.log($('.pb10'));
        },1000)
    },
    methods : {
        init(){
        },
        // 添加文章
        handleAdd(){
            
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.formWrapper{
    max-width: 800px;
}

</style>
