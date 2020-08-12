<template>
  <div class="box">
    <el-container class="containerBox">
      <el-header class="header">
        <div class="headNav">
          <router-link to="/home/articlesHome">
            <div class="logo">
              <img src="../assets/uleleya.png" alt="">
              <span>尤里里鸭</span>
            </div>
          </router-link>

          <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
              background-color="rgba(255,255,255,0)" text-color="#333" active-text-color="#ffd04b">
              <el-menu-item index="0" @click="saveNavState(paths[0])">首页</el-menu-item>
              <el-menu-item index="1" @click="saveNavState(paths[1])">帖子</el-menu-item>
              <el-menu-item index="2" @click="saveNavState(paths[2])">曲谱</el-menu-item>
              <el-menu-item index="3" @click="saveNavState(paths[3])">教学</el-menu-item>
              <el-menu-item index="4" @click="saveNavState(paths[4])">个人信息</el-menu-item>
          </el-menu>

          <div class="user-btn">
            <el-col :span="12">
              <div class="user">
                <div class="block">
                  <el-avatar size="large" :src="URL"></el-avatar>
                </div>
                <span>{{userInfo.username}}</span>
              </div>
            </el-col>
            <el-button class="goManage" v-if="userInfo.role === 'admin'" @click="goManage">后台</el-button>
            <el-button class="logout" @click="logout">退出</el-button>
          </div>
          
        </div>

        <el-carousel :interval="5000" arrow="always" height="500px" class="imgCar">
          <el-carousel-item v-for="item in backImageList" :key="item.id">
            <!-- <el-row>
              <el-col :span="24"><img :src="item.imgUrl"></el-col>
            </el-row> -->
            <img :src="item.imgUrl">
          </el-carousel-item>
        </el-carousel>
         
      </el-header>
     
      <el-container class="container">
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-container>
      <el-footer class="footer">
        <div class="text"><span>Copyright © 尤里里鸭</span>本网站所有资源来源于网络</div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    this.getArticleList();
    this.getUserInfo();
    this.activePath = window.sessionStorage.getItem("activePath");
    // this.getPic();
  },
    data() {
      return {
        backImageList: [
          {imgUrl: require('../assets/b2.jpg')},
          {imgUrl: require('../assets/b3.jpg')},
          {imgUrl: require('../assets/b4.jpg')}
        ],

        // 图片地址前缀
        baseURL: 'http://127.0.0.1:8082/public',
        activeIndex2: '',
        // 设置激活的状态路径
        activePath: '',
        // 状态路径数组
        paths: ['/home/articlesHome', '/home/allArticles', '/home/staffArticles', '/home/studyArticles', '/home/aboutUser'],
        // 参数对象
        queryInfo: {
          // 关键字查询
          query: '',
          // 当前页数
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 5
        },
        // 文章列表数据
        articleList: [],
        // 文章总数
        total: 0,

        // 登录用户信息
        userInfo: {},
        // 图片地址
        URL: '',
      }
    },
    methods: {
     
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
        
        // 保存链接的激活状态，并实现跳转
        saveNavState(activePath) {
          console.log(activePath);
            window.sessionStorage.setItem("activePath", activePath);
            this.activePath = activePath;
            this.$router.push(this.activePath);
        },

        // 退出
        logout() {
            // 销毁token
            window.sessionStorage.clear();
            // 跳转到登录页面
            this.$router.push('/home/login');
        },

        async getUserInfo() {
            // 根据id查询用户信息
            const id = window.sessionStorage.getItem('userId');
            const res = await this.$http.get('admin/findUser/' + id);
            console.log(res);
            if(res.status !== 200){
              return this.$message.error('查询用户信息失败！');
            }
            this.userInfo = res.data.data;
            this.URL = 'http://localhost:8082/public'+this.userInfo.avatar;
            this.baseURL = 'http://localhost:8082/admin/editAvatar/'+this.userInfo._id;
        },
        goManage() {
          this.$router.push('/admin/users');
        }
    },
  };
</script>

<style lang="less" scoped>
.box{
  height: 100%;
}
.el-container{
  height: 100%;
  // background-image: url('../assets/rainbow.jpg');
}
.container {
  width: 1400px;
  height: 2500px;
  margin: 0 auto!important;
  padding-top: 20px;
  justify-content: center;
}
  .el-header{
    position: relative;
    width: 100%;
    padding: 0;
    color: #333;
    text-align: center;
    height: 560px !important;
    line-height: 560px;
    .headNav {
      width: 100%;
      height: 60px;
      // background-color: #8AADCB;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      padding-left: 0;
      color: #333;
      align-items: center;
      font-size: 22px;
      .logo {
        height: 60px;
        display: flex;
        align-items: center;
        line-height: 60px;
        img {
            width: 100px;
            height: 60px;
        }
        span {
          height: 60px;
            margin-left: 8px;
            color: #aa6232!important;
            font-family: tahoma, arial, "Hiragino Sans GB", sans-serif;
        }
      }

      .el-button {
        background-color: #8AADCB;
        color: #fff;
        margin-right: 20px;
      }
    }
    .imgCar {
       line-height: 0;
    }
    
    
  }

.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
 .el-carousel__indicators--horizontal{
    height: 50px!important;
    line-height: 0!important;
  }

  .user-btn {
    height: 50px;
    line-height: 50px;
    width: 400px;
    align-items: center;
  }
  .block {
    float: left;
    height: 50px;
    display: flex;
    line-height: 50px;
    align-items: center;
  }
  .user {
    width: 150px;
    height: 50px;
    line-height: 50px;
    align-items: center;
  }
  .goManage {
    margin-left: 2px!important;
    margin-right: 2px!important;
  }
  .logout {
    margin-right: 2px!important;
  }
   .el-footer{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    bottom: 0;
    margin-top: 250px;
  }

  .search {
    span {
      color: #8AADCB;
    }
  }
  
  .el-menu-item {
    padding: 0 60px!important;
    font-size: 18px;
  }

  .footer {
    background: rgba(0, 0, 0, 0.85);
    color: #999;
    font-size: 14px;
    span {
      color: #ffffff!important;
      font-size: 18px;
      margin-right: 40px;
    }
  }

</style>