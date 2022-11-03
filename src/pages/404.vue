<template>
	<!-- <Modal />
	<Nav /> -->
  <div class="content">
<div class="left">
<a href=/>
    <span id=logo aria-label=Seer></span>
</a>
<span><b>404.</b><ins>Thats an error</ins></span>
<span><b>The requested URL / was not found in this server. </b>That's all we know.
</span>
</div>
    <div class="robot"></div>
</div>

<!-- <Footer /> -->
</template>
<script lang="ts">
import Modal from '../components/common/Modal.vue'
import Nav from '../components/common/Nav.vue'
import Footer from '../components/common/Footer.vue'
import { defineComponent } from 'vue'
export default defineComponent({
	name: '404',
	components: {
		Modal,
		Nav,
		Footer,
	},
})
</script>
<style scoped>
.content{
    margin-top: 177px;
    max-width: 1000px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-self: center;
    font-size: 18px;
}
.left{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 81px;
    gap: 34px;
}

.robot{
    /* flex: 1; */
    width: 533px;
    height: 400px;
    background: url(/asset/robot.png);
    background-size: contain;
    background-repeat: no-repeat;
    max-width: 100%;
}

#logo{
    width: 220px;
    height: 60px;
    background: url(/asset/logo404.png) 100% no-repeat;
    display: block;
    background-size: contain;
}
ins {
    text-decoration: none;
}

@media screen and (max-width: 999px) {
.content{
    max-width: 100vw;
}
    #logo{
        width: 117px;
height: 31px;
    }
    .content{
        margin-top: 2rem;
        flex-direction: column;
        padding: 0 2rem;
        align-items: center;
    }
    .left{
        padding-top: 0;
    }
}
</style>
