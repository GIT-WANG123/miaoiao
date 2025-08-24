<template>
  <footer id="footer">
    <ul>
      <router-link class="link" tag="li"to="/movie">
        <i class="fas fa-film nav-icon"></i>
        <p class="nav-text">电影</p>
      </router-link>
    
  
      <router-link class="link"tag="li"to="/cinema">
        <i class="fas fa-video nav-icon"></i> <!-- 直接使用Unicode -->
        <p class="nav-text">影院</p>
      </router-link>
     
      
      <router-link class="link" tag="li"to="/mine">
        <i class="fas fa-user nav-icon"></i> <!-- 直接使用Unicode -->
        <p class="nav-text">我的</p>
      </router-link>
    </ul>
  </footer>
</template>
  
<style scoped>
#footer {position: fixed; bottom: 0; left: 0;right: 0;background: #fff;border-top: 1px solid #e5e5e5;  z-index: 1000;padding: 5px 0;}
  #footer ul {display: flex;justify-content: space-around;list-style: none;height: 60px;align-items: center;max-width: 500px;margin: 0 auto;}
        

#footer ul li{display: flex;justify-content: center; /* 导航项居中 */align-items: center;max-width: 500px; /* 限制最大宽度 */width: 100%; /* 确保容器宽度100% */ }
#footer ul li.active{ color: #f03d37;}
#footer ul i{ font-size: 20px;}
#footer ul p{ font-size: 12px; line-height: 18px;}
#footer ul li.router-link-active{ color: #f03d37; }
#footer .link {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #666;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 15px;
            transition: all 0.3s ease;
            cursor: pointer;
            flex: 1;
            max-width: 140px;
            height: 50px;
        }
           #footer .link:hover {
            background: #f8f8f8;
        }
        
        #footer .link.active {
            color: #f03d37;
            background: #fff5f5;
        }
        
        #footer .nav-icon {
            font-size: 1.4rem;
            margin-bottom: 3px;
        }
        
        #footer .nav-text {
            font-size: 12px;
            font-weight: 500;
            color: #f03d37;
        }
        
        #footer .link:hover {
            background: #f8f8f8;
            color: #f03d37;
        }
        
        #footer .link .active {
            color: #f03d37;
            background: #fff5f5;
        }
        
        #footer .nav-icon {
            font-size: 1.4rem;
            margin-bottom: 3px;
           
        }
        
        
        

            
            
        
            
           
        </style>