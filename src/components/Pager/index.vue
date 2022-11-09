<template>
  <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
              <li class="prev disabled" :disabled="PageNo == 1" @click="()=>{$emit('getPage',PageNo!=1?this.PageNo-1:1)}">
                  <a >«上一页</a>
                </li>
                <li class="prev " v-if="startAend.start != 1" @click="()=>{$emit('getPage',1)}">
                  <a href="#">1</a>
                </li>
                <li class="dotted" v-if="startAend.start>2"><span>...</span></li>
                <li v-for="(page,index) in startAend.end" :key="index" :class="{active:page===PageNo}"
                v-if="page>=startAend.start"
                @click="()=>{$emit('getPage',page)}">
                  <a >{{page}}</a>
                </li>
                <li class="dotted" v-if="startAend.end<totalPage-1"><span>...</span></li>
                <li class="prev " v-if="startAend.end != totalPage" @click="()=>{$emit('getPage',totalPage)}">
                  <a>{{totalPage}}</a>
                <li class="next" :disabled="false" @click="()=>{$emit('getPage',PageNo!=totalPage?PageNo+1:totalPage)}">
                  <a >下一页»</a>
                </li>
              </ul>
              <div id="centerh"><span>共{{totalPage}}页&nbsp;</span></div>
            </div>
          </div>
</template>

<script>
export default {
    name:"Pager",
    props:["PageNo","Total","PageSize","continous"],
    computed:{
        //总页数
        totalPage(){
            //向上取整
            return Math.ceil(this.Total/this.PageSize)
        },
        startAend(){
            let start = 0
            let end = 0
            if(this.totalPage < this.continous){
                start = 1
                end = this.totalPage
            }else{
                start = this.PageNo - parseInt(this.continous/2)
                end = this.PageNo + parseInt(this.continous/2)
                if(start < 1){
                    start = 1
                    end = start + this.continous-1
                }
                if(end > this.totalPage){
                    end = this.totalPage
                    start = end - this.continous+1
                }
            }
            return {start,end}
        }
    }
}
</script>

<style lang="less">
    .page {
        width: 1000px;
        height: 66px;
        overflow: hidden;
        margin:0 auto;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
        #centerh {
          margin-top: 10px;
          float:left;
        }
      }
</style>