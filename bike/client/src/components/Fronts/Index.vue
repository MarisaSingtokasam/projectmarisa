<template>
  <div class="video-background-page">    
    <main-header navsel="front"></main-header> 
      <br><br>
      <br><br>  
      <mdb-card class="card-image" style="background-image: url(https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80)">
      <div class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
        <div>
          <h1 class="pink-text"><mdb-icon icon=""/>System Borrowing Bike</h1><br>
          <mdb-card-title tag="h3" class="pt-2"><strong>This is source</strong></mdb-card-title><br>
           <p>A bicycle-sharing system, bike share program, public bicycle scheme, or public bike share (PBS) scheme, 
             is a shared transport service in which bicycles are made available for shared use to individuals on a short term basis for a price or free. 
             Many bike share systems allow people to borrow a bike from a "dock" and return it at another dock belonging to the same system. 
             Docks are special bike racks that lock the bike, and only release it by computer control. 
             The user enters payment information, and the computer unlocks a bike. The user returns the bike by placing it in the dock, 
             which locks it in place. Other systems are dockless.In recent years, an increasing number of cities across the world have 
             started to offer both mechanical bike share and electric bicycle sharing systems, such as Dubai, 
             New York, Paris, Montreal and Barcelona.For many systems, smartphone mapping apps show nearby available bikes and open docks. 
             In July 2020, Google Maps began including bike shares in its route recommendations.
           </p>
          
        </div>
      </div>
      </mdb-card>      
  </div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
import _ from "lodash";
import ScrollMonitor from "scrollMonitor";
import { mdbCard, mdbCardTitle, mdbBtn, mdbIcon } from 'mdbvue';
let LOAD_NUM = 3;
let pageWatcher;
export default {  
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: "front",
      };
      if (this.search !== "") {
        route.query = {
          search: this.search,
        };
      }
      console.log("search: " + this.search);
      this.$router.push(route);
    }, 700),
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.blogs = [];
        this.results = [];
        this.loading = true;
        this.results = (await BlogsService.index(value)).data;
        this.appendResults();
        this.results.forEach((blog) => {
          if (this.category.length > 0) {
            // console.log(this.category.indexOf(blog.category))
            if (this.category.indexOf(blog.category) === -1) {
              this.category.push(blog.category);
            }
          } else {
            this.category.push(blog.category);
          }
        });
        this.loading = false;
        this.search = value;
        // console.log(this.category)
      },
    },
  },
  data() {
    return {
      blogs: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
      search: "",
      results: [],
      category: [],
      loading: false,
    };
  },
  // async created () {
  // this.blogs = (await BlogsService.index()).data
  // },
  methods: {
    appendResults: function () {
      if (this.blogs.length < this.results.length) {
        let toAppend = this.results.slice(
          this.blogs.length,
          LOAD_NUM + this.blogs.length
        );
        this.blogs = this.blogs.concat(toAppend);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      try {
        await BlogsService.delete(blog);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.blogs = (await BlogsService.index()).data;
    },
    setCategory(keyword) {
      if (keyword === " ") {
        this.search = "";
        console.log("null");
      } else {
        this.search = keyword;
      }
    },
  },
  updated() {
    let sens = document.querySelector("#blog-list-bottom");
    pageWatcher = ScrollMonitor.create(sens);
    pageWatcher.enterViewport(this.appendResults);
  },
  beforeUpdated() {
    if (pageWatcher) {
      pageWatcher.destroy();
      pageWatcher = null;
    }
  },
  name: 'ClassicFormPage',
    components: {
      mdbCard,
      mdbCardTitle,
      mdbBtn,
      mdbIcon
    }
  }

</script>
<style scoped>

.component-wrapper {
  padding-left: 5px;
  padding-right: 5px;
}
.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(7, 7, 7);
}
.hero h1 {
  margin-top: 30px;
}
.logo {
  padding-right: 20px;
}
.empty-blog {
  width: 100%;
  text-align: center;
  padding: 10px;
  background: darksalmon;
  color: white;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
  padding: 5px 5px 5px 5px;
  border: solid 1px rgb(248, 245, 245);
  margin: 10px 10px 0px 0px;
}
.blog-info {
  float: left;
}
.blog-pic {
  float: left;
}
.clearfix {
  clear: both;
}
.blog-list {
  border: solid 1px #f7f7f7;
  margin-bottom: 10px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.blog-header {
  margin-top: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
#blog-list-bottom {
  padding-top: 4px;
}
.blog-load-finished {
  padding: 4px;
  text-align: center;
  background: seagreen;
  color: white;
}
.categories {
  margin-top: 20px;
  padding: 0;
  list-style: none;
  float: left;
}
.categories li {
  float: left;
  padding: 2px;
}
.categories li a {
  padding: 5px 10px 5px 10px;
  background: paleturquoise;
  color: black;
  text-decoration: none;
}
.categories li.clear a {
  background: tomato;
  color: white;
}
.create-blog {
  margin-top: 10px;
}
@media (max-width: 768px) {
  .logo {
    width: 120px;
  }
}
.header {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  padding: 10px;
  position: relative;
  background-color: #ececec;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.1) inset;
  text-shadow: 1px 1px 1px #fff;
}
.categories {
  margin-top: 10px;
  padding: 0;
  width: 100%;
}

.blog-tab {
  padding: 1px;
  background-color: #fcf5f5;
  text-align: left;
  text-indent: 0.5em;
}
.footer {
  margin-top: 50px;
}

</style>