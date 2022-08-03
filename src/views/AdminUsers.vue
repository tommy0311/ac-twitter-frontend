<template>
  <div class="d-flex justify-content-center"> 
    <AdminNav
      :initial-users-list="isUsersList"
    />
    <div class="admin-main-wrapper ml-6">
      <NavpillHeaderMain
        :initial-admin-users="isAdminUsers"
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
  name: 'AdminUsers',
  components: {
    AdminNav,
    NavpillHeaderMain,
    AdminTweetElement,
  },
  data() {
    return {
      isUsersList: true,
      isAdminUsers: true,
    };
  },
}
</script>