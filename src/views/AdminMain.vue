<template>
  <div class="d-flex justify-content-center"> 
    <NavBar />
    <div class="admin-main-wrapper ml-6">
      <NavpillHeaderMain />
      <AdminTweetElement />      
    </div>   
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import NavpillHeaderMain from '../components/NavpillHeaderMain.vue';
import AdminTweetElement from '../components/AdminTweetElement.vue';

export default {
	name: 'MainPage',
	components: {
		NavBar,		
		NavpillHeaderMain,
        AdminTweetElement,		
	},
	data() {
		return {
			
		};
	},
	created() {
		
	},
	methods: {
		
	},
};
</script>
