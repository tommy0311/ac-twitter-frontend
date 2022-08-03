<template>
  <div class="d-flex justify-content-center"> 
    <AdminNav
      :initial-tweets-list="isTweetsList"
    />
    <div class="admin-main-wrapper ml-6">
      <NavpillHeaderMain
        :initial-admin-main="isAdminMain"
      />
      <AdminTweetElement />
    </div>
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav.vue';
import NavpillHeaderMain from '../components/NavpillHeaderMain.vue';
import AdminTweetElement from '../components/AdminTweetElement.vue';

export default {
  name: 'AdminMain',
  components: {
    AdminNav,
    NavpillHeaderMain,
    AdminTweetElement,
  },
  data() {
    return {
      isTweetsList: true,
      isAdminMain: true,
    };
  },
  created() {
  },
  methods: {
  },
};
</script>
