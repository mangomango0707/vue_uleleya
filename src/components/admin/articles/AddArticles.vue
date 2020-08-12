<template>
  <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加文章</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 卡片视图区域 -->
      <el-card>
          <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="80px" label-position="top" enctype="multipart/form-data">
              <el-form-item label="标题" prop="title">
                  <el-input v-model="addForm.title"></el-input>
              </el-form-item>
              <el-form-item label="作者" prop="authorName">
                  <el-input v-model="addForm.authorName"></el-input>
              </el-form-item>
              <el-form-item label="发布时间">
                  <el-input type="date" v-model="addForm.publishDate"></el-input>
              </el-form-item>
              <el-form-item label="封面">
                  <el-upload action="http://127.0.0.1:8082/admin/addArticle" :http-request="addArticle" ref="upload" multiple :auto-upload="false">
                      <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
              </el-form-item>
              <el-form-item label="文章内容">
                  <quill-editor v-model="addForm.content"></quill-editor>
              </el-form-item>
              <el-form-item label="类型">
                  <el-select v-model="addForm.type" clearable placeholder="请选择文章类型">
                    <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="标签">
                  <el-select v-model="addForm.tag" clearable placeholder="请选择文章标签">
                    <el-option v-for="item in tagOptions" :key="item.value" :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-button type="primary" @click="addArticle">添加文章</el-button>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
    created() {
        
    },
    data() {
        return {
            // 添加文章表单
            addForm: {
                title: '',
                authorName: '',
                publishDate: '',
                pic: '',
                content: '',
                type: '',
                tag: ''
            },
            // 添加文章表单规则
            addFormRules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                authorName: [
                    { required: true, message: '请输入作者', trigger: 'blur' }
                ]
            },
            // 类型选择数组
            typeOptions: [
                {
                    value: 1,
                    label: '曲谱'
                },
                {
                    value: 2,
                    label: '教学'
                }
            ],
            // 标签选择数组
            tagOptions: [
                {
                    value: 1,
                    label: '弹唱'
                },
                {
                    value: 2,
                    label: '指弹'
                },
                {
                    value: 3,
                    label: '民谣'
                },
                {
                    value: 4,
                    label: '流行'
                },
                {
                    value: 5,
                    label: '古风'
                }
            ],

            // 图片上传的url
            uploadURL: 'http://127.0.0.1:8082/admin/addArticle',
            // 控制图片预览的对话框的显示与隐藏
            previewVisible: false,
            // 显示图片预览的图片URL地址
            picURL: '',
            // 为上传的请求头添加Authorization属性得到token值
            headersObj: {
                Authorization: window.sessionStorage.getItem("token")
            }
        }
    },
    methods: {
        // 点击文件实现图片预览
        handlePreview(file) {
            console.log(file);
            this.picURL = file.response.data.url;
            this.previewVisible = true;
        },
        // 删除图片
        handleRemove(file) {
            console.log(file);
            this.addForm.pic = '';
        },
        // 监听图片上传成功后，将图片信息添加到文章中
        handleSuccess(response) {
            console.log(response);
            this.addForm.pic = response.data.tmp_path;
            // this.addForm.pic.push(picObj);
            console.log(this.addForm);
            // console.log(this.addForm);
        },
        // 添加文章
        async addArticle() {
            var formData = new FormData();
            var file = this.$refs.upload.uploadFiles[0];
            // 设置请求头
            var headerConfig = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };
           
            formData.append('file', file.raw);
            formData.append('title', this.addForm.title);
            formData.append('authorName', this.addForm.authorName);
            formData.append('publishDate', this.addForm.publishDate);
            formData.append('content', this.addForm.content);
            formData.append('type', this.addForm.type);
            formData.append('tag', this.addForm.tag);

            // console.log(formData.get('publishDate'));
             // 发起添加请求
             this.$refs.addFormRef.validate(async valid => {
                 if(!valid){
                     return this.$message.error('请填写必要的表单项！');
                 }
                const res = await this.$http.post('admin/addArticle', formData, headerConfig);
                console.log(res);
                if(res.status !== 200){
                    return this.$message.error('添加文章失败！');
                }
                this.$message.success('添加文章成功！');
                this.$router.push('/admin/articles');
             });
        }
    }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
}
.previewPic {
    width: 100%;
}
.el-select {
  width: 100%;
}
</style>