<template>
    <div class="index">
        <div class="pb20">
            <Breadcrumb >
                <Breadcrumb-item>标签管理</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <!-- 搜索 -->
        <div class="search-wrapper">
            <Form :model="formSearch" inline :rules="formSearchRule" ref="formSearch">
                <Form-item label="文章标题:" :label-width="80">
                    <Input v-model="formSearch.title" placeholder="请输入"></Input>
                </Form-item>
                <Form-item>
                   <Button type="primary" @click="handleSearch('formSearch')">查询</Button>
               </Form-item>
            </Form>
        </div>
        <div class="pb20">
            <Button type="primary" @click='addTag'>新增标签</Button>
        </div>
        
        <Table :columns="columns1" :data="tableList"></Table>
        <div class="page-wrapper">
            <Page :total="total" show-sizer show-total :page-size-opts="[10,20,50]" 
            @on-change='handlePageChange' 
            @on-page-size-change='handlePageSizeChange'
            ></Page>
        </div>
        <!-- 弹窗 -->
        <Modal
            v-model="tagVisible"
            :title="tagTitle"
            :loading = 'tagLoading'
            :mask-closable = 'false'
        >
            <Form :model="tagForm" :label-width="80" :rules="tagFormRule" ref='tagForm'>
                <FormItem label="标签名：" prop='tagName'>
                    <Input v-model="tagForm.tagName" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="类别：" prop='categoryId'>
                    <Select v-model="tagForm.categoryId" placeholder="请选择" clearable >
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button  @click="tagCancel('tagForm')">取消</Button>
                <Button type="primary"  @click="tagOk('tagForm')">确定</Button>
            </div>
            
        </Modal>
    </div>
</template>

<script>
// import $ from 'jquery';
// import qs from 'qs';
import { queryArticleList } from '../../../api/back/api.js';
// import moment from 'moment';
export default {
    title: 'index',
    computed: {
        tagTitle() {
            if (this.type === 'add') {
                return '新增标签';
            } else {
                return '编辑标签';
            }
        }
    },
    data () {
        return {
            columns1: [
                {
                    title: '标题',
                    key: 'title'
                },
                {
                    title: '内容',
                    key: 'content'
                },
                {
                    title: '修改时间',
                    key: 'modifyDate',
                    render: (h, params) => {
                        // console.log(h,params)
                        let arr = [];
                        if (params.row.modifyDate) {
                            arr = h('span', {
                            }, params.row.modifyDate.toLocaleString())
                        } else {
                            arr = h('span', {
                            }, '--')
                        }
                        return arr;
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.handleEdit(params)
                                    }
                                }
                            }, '编辑'),
                            h('a', {
                                on: {
                                    click: () => {
                                        this.handleRemove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            tableList: [],
            formSearch: {
                title: '',
                content: ''
            },
            formSearchRule: {
                title: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ]
            },
            // 分页参数
            pageStart: 1,
            pageSize: 10,
            total: 0,
            // 弹窗
            tagVisible: false,
            tagLoading: false,
            // 弹窗类型
            type: 'add',
            tagForm: {
                tagName: '',
                categoryId: ''
            },
            tagFormRule: {
                tagName: [
                    { required: true, message: '请填写标签', trigger: 'blur' }
                ],
                categoryId: [
                    { required: true, message: '请选择类别', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        // 获得初始列表
        this.getInitData();
        // console.log(moment.utc())
    },
    methods: {
        getInitData() {
            let param = {
                title: this.formSearch.title,
                content: this.formSearch.content,
                pageStart: (this.pageStart - 1) * this.pageSize,
                pageSize: this.pageSize
            };
            queryArticleList(param)
                .then((res) => {
                    let _data = res.data;
                    if (_data.success) {
                        this.tableList = _data.data.list;
                        this.total = _data.data.count;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        // 添加标签
        addTag() {
            this.tagVisible = true;
        },
        // 查看
        handleView() {
        },
        // 编辑
        handleEdit(params) {
            this.type = 'edit';
            this.tagVisible = true;
        },
        // 删除
        handleRemove() {
        },
        // 弹窗点击确定
        tagOk(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        // 弹窗点击取消
        tagCancel(name) {
            const self = this;
            self.tagVisible = false;
            setTimeout(function() {
                self.$refs[name].resetFields();
            }, 500)
        },
        handleSearch() {
            this.pageStart = 1;
            this.getInitData();
        },
        handlePageChange(val) {
            this.pageStart = val;
            this.getInitData();
        },
        handlePageSizeChange(val) {
            this.pageSize = val;
            this.getInitData();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

.bg{
    position: absolute;
    right:100px;
    bottom: 0; 
    width: 180px;
    height: 440px;
    background: url(/static/img/bg.png) no-repeat;
    background-size: 100% auto;
    background-position: center bottom;
}
.main-wrapper{
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 300;
    text-align: center;
    .main{
        display: flex;
        height: 100%;
        align-items:center;
        >div{
            width: 100%;
            >a{
                display: inline-block;

            }
        }
    }
}
.page-wrapper{
    padding:30px 0;
    text-align: right;
}
</style>
