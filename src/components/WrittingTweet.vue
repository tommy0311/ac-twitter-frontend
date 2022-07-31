<template>
  <div id="writtingTweet-container">
    <div class="writtingTweet-pannel d-flex">
      <img
        class="user-headshot"
        src="../assets/Photo2.png"
        alt="個人頭像"
      >
      <form
        class="user-writing-post-form"
        @submit.prevent.stop="handleSubmit"
      >
        <textarea
          id="user-writting-post"
          v-model="tweet"
          class="user-writting-post"
          placeholder="有什麼新鮮事"
          required
        />
        <div class="d-flex justify-content-end align-items-end">
          <button
            class="post-btn second-btn-style"
            type="submit"
          >
            推文
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- <div class="user-post-under-line"></div> -->
</template>

<script>
import tweetAPI from '../apis/tweets';
import { Toast } from './../utils/helpers';

export default {
	name: 'WrittingTweet',
	methods: {
		async handleSubmit() {
			try {
        const trimmedTweet = this.tweet.trim()
				if (!trimmedTweet.length) {
					Toast.fire({
						icon: 'warning',
						title: '推文內容不能為空白',
					});
					return;
				}
				await tweetAPI.postTweet(trimmedTweet);
        this.tweet = ''
        console.log(this.tweet)
				Toast.fire({
					icon: 'success',
					title: '推文成功發佈',
				});
			} catch (err) {
				// 顯示錯誤提示
				Toast.fire({
					icon: 'warning',
					title: '發生錯誤，請重試。',
				});

				console.error(err.message);
			}
		},
	},
};
</script>
