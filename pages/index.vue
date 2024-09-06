<template>
  <main>
    <div class="container mx-auto py-16">
      <div class="flex items-center justify-between">
        <h2
          class="mb-8 text-3xl font-bold tracking-wide leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white"
        >
          Posts
        </h2>
        <button
          @click="openCreateModal()"
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <svg
            class="w-3 h-3 me-2 dark:text-white"
            id="Layer_1"
            style="enable-background: new 0 0 32 32"
            version="1.1"
            viewBox="0 0 32 32"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              fill="currentColor"
              d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"
            />
          </svg>
          Add Post
        </button>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="p-4">
                <div
                  class="flex items-center whitespace-nowrap select-none cursor-pointer dark:text-zinc-300"
                  @click="sortById"
                >
                  <svg
                    class="w-3 h-3 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                    />
                  </svg>
                  Post ID
                </div>
              </th>
              <th scope="col" class="dark:text-zinc-300 px-6 py-3">User</th>
              <th scope="col" class="dark:text-zinc-300 px-6 py-3">
                Post Title
              </th>
              <th scope="col" class="dark:text-zinc-300 px-6 py-3">
                Post Content
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="post in posts"
              :key="post.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td class="px-6 py-4">{{ post?.id }}</td>
              <th
                scope="row"
                class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div v-if="users[post.userId]">
                  <div class="text-base font-semibold">
                    {{ users[post.userId]?.name }}
                  </div>
                  <div class="font-normal dark:text-zinc-300 text-gray-500">
                    {{ users[post.userId]?.email }}
                  </div>
                </div>
                <div v-else>Loading user...</div>
              </th>
              <td class="px-6 py-4 text-base font-normal dark:text-white">
                {{ post.title }}
              </td>
              <td class="px-6 py-4 text-base font-normal dark:text-white">
                {{ post.body }}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          role="status"
          v-if="pending"
          class="absolute w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center top-0 left-0"
        >
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <div class="flex gap-2 justify-end mt-4">
        <!-- Previous Button -->
        <NuxtLink
          v-if="currentPage > 1"
          :to="{
            name: 'index',
            query: {
              page: currentPage - 1,
            },
          }"
          class="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="previousPage"
        >
          <svg
            class="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </NuxtLink>

        <!-- Next Button -->
        <NuxtLink
          v-if="posts.length"
          :to="{
            name: 'index',
            query: {
              page: currentPage + 1,
            },
          }"
          class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="nextPage"
        >
          Next
          <svg
            class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
    <CreatePostModal />
  </main>
</template>

<script setup lang="ts">
import { useStore } from "~/store/store";
const store = useStore();
const route = useRoute();
const currentPage = ref(route.query.page ? +route.query.page : 1);

function openCreateModal() {
  store.createPostModal = true;
}

const fetchUrl = computed(
  () =>
    `https://jsonplaceholder.typicode.com/posts?_page=${currentPage.value}&_limit=10`
);

const {
  data: posts,
  pending,
  refresh,
}: any = await useAsyncData(`posts-page-${currentPage.value}`, () =>
  $fetch(fetchUrl.value)
);

const users = ref<any>({});
const fetchUser = async (userId: number) => {
  if (!users.value[userId]) {
    const user = await $fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    users.value[userId] = user;
  }
};

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const sortById = (): void => {
  const isSortedAscending = posts.value.every(
    (post: Post, i: number, arr: Post[]) => i === 0 || arr[i - 1].id <= post.id
  );

  if (isSortedAscending) {
    posts.value = [...posts.value].sort((a: Post, b: Post) => b.id - a.id);
  } else {
    posts.value = [...posts.value].sort((a: Post, b: Post) => a.id - b.id);
  }
};

const nextPage = async () => {
  currentPage.value += 1;
  await refresh();
};

const previousPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    await refresh();
  }
};

posts.value.forEach((post: Post) => {
  fetchUser(post.userId);
});
watch(
  () => posts.value,
  () => {
    posts.value.forEach((post: Post) => {
      fetchUser(post.userId);
    });
  }
);
</script>
