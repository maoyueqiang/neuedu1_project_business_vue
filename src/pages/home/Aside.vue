<template>
    <div>
        <!-- 系统 Logo -->
        <el-aside class="header-logo" :width="asideWidth">
            <div @click="$router.push({ name: 'Home' })">
                <a v-if="foldAside">人力资源管理系统</a>
                <a v-else style="font-size:14px">人力</a>
            </div>
        </el-aside>
        <el-aside class="aside" :width="asideWidth" :class='"icon-size-" + iconSize'>
            <el-scrollbar style="height: 100%; width: 100%;">
                <!--
                        default-active 表示当前选中的菜单，默认为 home。
                        collapse 表示是否折叠菜单，仅 mode 为 vertical（默认）可用。
                        collapseTransition 表示是否开启折叠动画，默认为 true。
                        background-color 表示背景颜色。
                        text-color 表示字体颜色。
                    -->
                <el-menu :default-active="menuActiveName || 'home'" :collapse="!foldAside" :collapseTransition="false"
                 background-color="#263238" text-color="#8a979e">
                    <el-menu-item index="home" @click="$router.push({ name: 'Menu' })">
                        <!-- <i class="el-icon-s-home"></i> -->
                        <span slot="title">菜单管理</span>
                    </el-menu-item>
                    <el-menu-item index="demo-echarts" @click="$router.push({ name: 'Distribute' })">
                        <!-- <i class="el-icon-s-data"></i> -->
                        <span slot="title">业务角色管理</span>
                    </el-menu-item>
                    <el-menu-item index="demo-ueditor" @click="$router.push({ name: 'User' })">
                        <!-- <i class="el-icon-document"></i> -->
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <!-- <el-submenu index="demo">
                        <template slot="title">
                            <i class="el-icon-star-off"></i>
                            <span>demo</span>
                        </template>

                    </el-submenu> -->
                </el-menu>
            </el-scrollbar>
        </el-aside>
    </div>
</template>

<script>
    export default {
        name: 'Aside',
        // 获取home组件中aside属性的值（下面是属性的名字）
        props: ['foldAside'],
        data() {
            return {
                // 保存当前选中的菜单
                menuActiveName: 'home',
                // 保存当前侧边栏的宽度
                asideWidth: '240px',
                // 用于拼接当前图标的 class 样式
                iconSize: 'true'
            }
        },
        watch: {
            // 监视是否折叠侧边栏，折叠则宽度为 64px。
            foldAside(val) {
                this.asideWidth = val ? '240px' : '64px'
                this.iconSize = val
            }
        }
    }
</script>

<style>
  .aside {
      height: calc(100vh - 50px);
      width: 100%;
      max-width: 240px;
      background-color: #263238;
      text-align: left;
  }

  .header-logo {
      background-color: #17b3a3;
      text-align: center;
      height: 50px;
      line-height: 50px;
      width: 240px;
      font-size: 24px;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
  }
  .el-submenu .el-menu-item {
      max-width: 240px !important;
  }
  .el-scrollbar__wrap {
      overflow-x: hidden !important;

  }
  .icon-size-false i {
      font-size: 30px !important;
  }
  .icon-size-true i {
      font-size: 18px !important;
  }
</style>

