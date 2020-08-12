<template>
  <div>
    <el-container class="container">
      
        <el-container class="main-container">
          <el-main class="main">
            <h2>最新曲谱帖</h2>
            <el-divider></el-divider>
            <!-- 卡片 -->
            <el-row>
              <el-col :span="8" v-for="item in staffArticleList" :key="item.id">
                <router-link :to="'/home/articleDetail/'+ item._id">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <img :src="baseURL+item.pic" class="image">
                  <div class="detail" style="padding: 14px;">
                      <div class="title">{{item.title}}</div>
                      <!-- <div class="title"><a :href="baseurlFind+item._id">{{item.title}}</a></div> -->
                      <el-divider></el-divider>
                      <div class="auth_date">
                        <div class="author">作者：{{item.author.username}}</div>
                        <div class="date">
                          <time class="time">{{item.publishDate | dateFormat}}</time>
                        </div>
                      </div>
                      
                    </div>
                </el-card>
                </router-link>
              </el-col>
            </el-row>

            <h2>最新教学帖</h2>
            <el-divider></el-divider>
            <!-- 卡片 -->
            <el-row>
              <el-col :span="8" v-for="item in studyArticleList" :key="item.id">
                <router-link :to="'/home/articleDetail/'+ item._id">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <img :src="baseURL+item.pic" class="image">
                  <div class="detail" style="padding: 14px;">
                      <div class="title">{{item.title}}</div>
                      <!-- <div class="title"><a :href="baseurlFind+item._id">{{item.title}}</a></div> -->
                      <el-divider></el-divider>
                      <div class="auth_date">
                        <div class="author">作者：{{item.author.username}}</div>
                        <div class="date">
                          <time class="time">{{item.publishDate | dateFormat}}</time>
                        </div>
                      </div>
                      
                    </div>
                </el-card>
                </router-link>
              </el-col>
            </el-row>

          </el-main>
          
        </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  created() {
    this.getArticleList();
    this.getStaffArticleList();
    this.getStudyArticleList();
    // this.getPic();
  },
    data() {
      return {
        
        // 图片地址前缀
        baseURL: 'http://localhost:8082/public',
        activeIndex2: '',
        // 参数对象
        queryInfo: {
          // 关键字查询
          query: '',
          // 唯一条件查询
          // limit: '',
          // 当前页数
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 6
        },
        // 文章列表数据
        articleList: [],
        staffArticleList: [],
        studyArticleList: [],
        // 文章总数
        total: 0,
        // 点击文章查询详情的baseurlFind
        baseurlFind: 'http://localhost:8082/admin/findArticle/'
      }
    },
    methods: {
      handleSelect() {

      },
      // 获取文章列表数据
        async getArticleList() {
          const res = await this.$http.get('admin/articles', {params: this.queryInfo});
          console.log(res);
          if(res.status !== 200){
            return this.$message.error('获取文章数据失败！');
          }
          this.articleList = res.data.articles;
          this.total = res.data.total;
        },

        // 获取曲谱文章列表数据
        async getStaffArticleList() {
          const res = await this.$http.get('admin/articles', {params: {query: '曲谱', pagenum: 1, pagesize: 6}});
          console.log(res);
          if(res.status !== 200){
            return this.$message.error('获取文章数据失败！');
          }
          this.staffArticleList = res.data.articles;
          this.total = res.data.total;
        },

        // 获取教学文章列表数据
        async getStudyArticleList() {
          const res = await this.$http.get('admin/articles', {params: {query: '教学', pagenum: 1, pagesize: 6}});
          console.log(res);
          if(res.status !== 200){
            return this.$message.error('获取文章数据失败！');
          }
          this.studyArticleList = res.data.articles;
          this.total = res.data.total;
        },
        

        // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getArticleList();
    },
    // 监听当前页码改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getArticleList();
    },
    },
  };
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
  // background-image: url('../assets/rainbow.jpg');
  min-height: 100%;
}
.container {
  width: 1200px;
  margin: 0 auto!important;
  justify-content: center;
}
  .el-aside {
    width: 250px!important;
    // background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 0;
    padding-top: 30px;
  }
    .el-main {
    // background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .articles {
  display: block;
  height: 300px;
}
h2{
  height: 100px;
  line-height: 100px;
  font-size: 26px;
  font-family: STCaiyun;
}

.author {
  display: inline-block;
}
.publishDate {
  display: inline-block;
}

.searchText {
  text-align: left;
  margin-left: 8px;
}

// 卡片
.el-card {
  margin: 10px;
  width: 350px;
  height: 350px;
}
el-col {
  line-height: 300px;
}
a {
  color: black;
}
.detail {
  height: 72px!important;
  line-height: 0px;
}
.title{
  // display: flex;
  height: 30px;
  line-height: 30px;
  // margin-top: 10px;
  text-align: left;
  width: 100%;
  overflow: hidden;   //超出的部分隐藏
  text-overflow: ellipsis;    //超出部分用省略号
  white-space: nowrap;    //设置为单行
}
.el-divider {
  margin: 5px 0;
}
.auth_date {
  margin-top: 25px;
}
.author{
  float: left;
  color: #8AADCB;
}
.date {
  text-align: right;
}

 .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 250px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .el-pagination {
  margin-top: 15px;
}

// 卡片
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  // 隐藏自带的滚动条
// .el-main {
//   overflow-x: hidden;
//   overflow-y: hidden;
// }
</style>
