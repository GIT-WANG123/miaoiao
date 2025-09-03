<<template>
    <div class="messagebox">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <div class="button-group">
            <div class="button cancel-btn" @click="handleCancel">{{ cancel }}</div>
            <div class="button ok-btn" @click="handleOk">{{ ok }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MessageBox",
    props: {
        title: String,
        content: String,
        cancel: String,
        ok: String,
        onCancel: Function, // 接收取消回调
        onOk: Function      // 接收确定回调
    },
    methods: {
        handleCancel() {
            console.log('取消按钮被点击');
            this.onCancel && this.onCancel(); // 调用父级传递的回调
        },
        handleOk() {
            console.log('确定按钮被点击');
            this.onOk && this.onOk(); // 调用父级传递的回调
        }
    }
};
</script>
<style scoped>
.messagebox {
    width: 300px;
    height: 180px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
      z-index: 9999 !important;
    padding: 20px;
    box-sizing: border-box;
}
messagebox::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
}
.messagebox h2 {
    text-align: center;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
    padding-bottom: 10px;
    font-size: 18px;
    color: #333;
}

.messagebox p {
    text-align: center;
    line-height: 24px;
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
}

.button-group {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.button {
    padding: 8px 20px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    min-width: 80px;
    font-size: 14px;
    transition: all 0.3s;
}

.cancel-btn {
    border: 1px solid #dcdfe6;
    background: #fff;
    color: #606266;
}

.cancel-btn:hover {
    border-color: #c6e2ff;
    background-color: #ecf5ff;
    color: #409eff;
}

.ok-btn {
    border: 1px solid #409eff;
    background: #409eff;
    color: #fff;
}

.ok-btn:hover {
    background: #66b1ff;
    border-color: #66b1ff;
}
</style>


