<template>
  <div class="header-wrapper">
    <div class="nav-wrapper">
      <div class="logo">
        <a href="">幕冬有柒</a>
      </div>
      <div class="nav-wapper flex-items">
        <ul class="nav flex-items">
          <li class="nav-item">
            <nuxt-link to="/" class="item">
              <i class="iconfont icon-fort-awesome" />
              <span>首页</span>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <el-dropdown>
              <span class='item'>
                <i class='iconfont icon-list-ul' />
                <span>分类</span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="nav-item">
            <nuxt-link to="/archives" class="item">
              <i class='iconfont icon-archive' />
              <span>归档</span>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/links" class="item">
              <i class='iconfont icon-link' />
              <span>友人帐</span>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/tags" class="item">
              <i class='iconfont icon-tag' />
              <span>标签墙</span>
            </nuxt-link>
          </li>
        </ul>
        <div class="nav-search">
          <i class="el-icon-search"></i>
          <i class="el-icon-user"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};

</script>

<style lang="less" scoped>
  .header-wrapper {
    .search-form--modal {
      -webkit-transition: visibility .25s ease, opacity .25s ease;
      -moz-transition: visibility .25s ease, opacity .25s ease;
      -ms-transition: visibility .25s ease, opacity .25s ease;
      -o-transition: visibility .25s ease, opacity .25s ease;
      transition: visibility .25s ease, opacity .25s ease;
      overflow: hidden;
      z-index: 999;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: #fff;
      visibility: hidden;
      opacity: 0;
    }

    .search-form--modal .search-form__inner {
      max-width: 640px;
      padding: 0 20px;
      margin: auto;
      text-align: left;
      position: absolute;
      width: 100%;
      left: 0;
      right: 0;
      height: 285px;
      top: 0;
      bottom: 0;
    }

    .search-form .box {
      position: relative;
    }

    .search-form--modal .search-form__inner p {
      padding-left: 24px;
      color: #404040;
      font-size: 15px;
      line-height: 1.5;
      margin: 15px 0 22px 0;
    }

    .search-form i {
      font-size: 32px;
      font-size: 2rem;
      line-height: 1;
      color: #ddd;
      position: absolute;
      bottom: 10px;
      margin-top: -16px;
      left: 16px;
    }

    .search-form input {
      font-size: 24px;
      font-size: 1.5rem;
      background: #fff;
      padding: 12px 24px 12px 64px;
      width: 100%;
      outline: none;
      border-radius: 50px;
      color: #666;
      border: 1px solid #ccc;
    }

    .search-form .search_close {
      position: absolute;
      width: 35px;
      height: 35px;
      background: 0 0;
      top: 20px;
      right: 15px;
      cursor: data-uri('../assets/images/ayuda.cur'), auto;
    }

    .search_close:before,
    .search_close:after {
      background-color: #222;
      position: absolute;
      content: "";
      width: 30px;
      height: 2px;
      top: 17px;
      left: 2px;
    }

    .search_close:before {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }

    .search_close:after {
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }

    .search-form.is-visible {
      visibility: visible;
      opacity: .99;
      animation: elastic .5s;
      background-image: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.2.1/img/other/iloli.gif);
      background-repeat: no-repeat;
      background-position: bottom right;
    }

    @keyframes elastic {
      0% {
        transform: scale(0)
      }

      55% {
        transform: scale(1)
      }

      70% {
        transform: scale(.98)
      }

      100% {
        transform: scale(1)
      }
    }

    @media (min-width: 768px) {
      &:hover .nav-wrapper {
        background: rgba(255, 255, 255, .95);
        box-shadow: 0 1px 40px -8px rgba(0, 0, 0, .5);
      }
    }

    @media(max-width:768px) {
      .search-form.is-visible {
        background-size: 30%;
      }

      .search-form--modal .search-form__inner p {
        padding-left: 10px;
        font-size: 14px;
      }

      .search-form i {
        font-size: 22px;
        bottom: 11px;
      }

      .search-form input {
        padding: 10px 10px 10px 45px;
        font-size: 18px;
      }
    }
  }

  .nav-wrapper {
    width: 100%;
    height: 75px;
    position: fixed;
    top: 0;
    padding: 0 30px;
    z-index: 999;
    transition: all .4s ease;

    @media (max-width: 768px) {
      height: 50px;
      padding: 0 15px
    }
  }

  .logo {
    float: left;
    height: 75px;
    line-height: 75px;
    max-width: 120px;

    a {
      color: #464646;
      font-size: 20px;
      font-weight: 800;
    }

    i {
      font-size: 22px;
      color: #666666;
      cursor: data-uri('../assets/images/ayuda.cur'), auto;
      display: none;
    }

    i:hover {
      color: #fe9600;
    }

    a:hover {
      color: #fe9600;
    }

    @media (max-width: 768px) {
      height: 50px;
      line-height: 50px;

      a {
        display: none;
      }

      i {
        display: inline-block;
      }
    }
  }

  .nav-wapper {
    float: right;
    height: 75px;

    .flex-items {
      height: 75px;
    }

    @media (max-width: 768px) {
      height: 50px;

      .flex-items {
        height: 50px;
      }
    }
  }

  .nav {
    height: 75px;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .nav-item {
    padding: 0 15px;

    .item {
      display: block;
      color: #666666;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      position: relative;
      cursor: data-uri('../assets/images/ayuda.cur'), auto;
    }

    .item i {
      margin-right: 5px;
    }

    .item:after {
      content: "";
      display: block;
      position: absolute;
      bottom: -17px;
      height: 6px;
      background-color: #fe9600;
      width: 0px;
      transition: width .25s ease-in-out;
    }

    &:hover .item {
      color: #fe9600;
    }

    &:hover .item:after {
      width: 100%;
    }

    .NavDropdown ul {
      padding: 10px;
      text-align: center;
      box-shadow: 0 1px 40px -8px rgba(0, 0, 0, .5);
    }

    .NavDropdown ul li:hover {
      background: none;
    }

    .NavDropdown ul li:hover a {
      color: #fe9600;
    }

    .NavDropdown ul:before {
      content: "";
      position: absolute;
      top: -20px;
      left: 50%;
      margin-left: -10px;
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }
  }

  .nav-search {
    i {
      margin-left: 20px;
      color: #666666;
      cursor: data-uri('../assets/images/ayuda.cur'), auto !important;
    }

    i:hover {
      color: #fe9600;
    }

    .el-icon-search {
      font-size: 22px;
    }

    .el-icon-user {
      font-size: 24px;
    }

    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-left: 20px;
    }
  }

</style>
