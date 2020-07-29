<template>
    <div id="components-layout-demo-basic" ref="msgContent">
        <a-layout>
            <a-affix :offset-top="top">
                <a-layout-header>COVID-19知识问答机器人</a-layout-header>
            </a-affix>
            <a-layout-content>
                <a-spin :spinning="spinning" tip="机器人正在思考中 :)">
                    <div v-for="message in messages" :class="message.type === 0 ? 'bot':'user'">
                        <span>{{message.value}}</span>
                    </div>
                </a-spin>
            </a-layout-content>

            <a-layout-footer>
                <span>
                    <a-input
                            size="large"
                            style="width: 380px"
                            @change="onChange"
                            v-model="inputMsg"
                            allow-clear
                            @pressEnter="send"
                    />
                    <a-button type="primary" size="large" :disabled="disabled" @click="send">发送</a-button>
                </span>
            </a-layout-footer>
        </a-layout>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                top: 0,
                bottom: 0,
                disabled: true,
                spinning: false,
                inputMsg: "",
                messages: [
                    {
                        type: 0,
                        value: "您好，我是Covid-19知识问答机器人"
                    },
                ]
            };
        },
        methods:{
            send(){
                if (this.disabled === false){
                    this.spinning = true
                    this.disabled = true
                    const url = "http://localhost:5005/webhooks/rest/webhook"
                    const data = {
                        "sender" : "Rasa",
                        "message" : this.inputMsg
                    }
                    this.messages.push({type: 1,value: this.inputMsg})
                    this.$nextTick(()=>{
                        //注意DTD使用document.documentElement
                        document.documentElement.scrollTop = this.$refs.msgContent.scrollHeight
                    })
                    this.inputMsg = ""
                    this.$http.post(url,data).then(
                        response => {
                            const result = response.data
                            this.spinning = false
                            this.disabled = true
                            for (var i = 0;i<result.length;i++){
                                this.messages.push({type: 0,value: result[i].text})
                            }
                            this.$nextTick(()=>{
                                //注意DTD使用document.documentElement
                                document.documentElement.scrollTop = this.$refs.msgContent.scrollHeight
                            })
                        }
                    )
                }
            },
            onChange(){
                this.disabled = this.inputMsg === "";
            }
        }
    };
</script>

<style>
    #components-layout-demo-basic .ant-layout-header{
        color: #fff;
        text-align: center;
    }
    #components-layout-demo-basic .ant-layout-footer {
        background: black;
        color: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 45px;
        padding: 3px 10px;
        text-align: center;
    }
    #components-layout-demo-basic .ant-layout-content {
        background: white;
        padding-bottom: 40px;
    }
    #components-layout-demo-basic .bot{
        margin: 10px;
    }
    #components-layout-demo-basic .user{
        margin: 10px;
        text-align: right;
    }
    #components-layout-demo-basic .bot span{
        display: inline-block;
        padding: 3px 10px;
        border: 1px solid aliceblue;
        border-radius: 15px;
        background: gray;
    }
    #components-layout-demo-basic .user span{
        display: inline-block;
        padding: 3px 10px;
        border: 1px solid aliceblue;
        border-radius: 15px;
        background: greenyellow;
    }
    ::-webkit-scrollbar {
        width: 0 !important;
    }
    ::-webkit-scrollbar {
        width: 0 !important;height: 0;
    }
</style>
