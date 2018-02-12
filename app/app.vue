<template>
  <div>
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './Nav.vue';

export default {
	components: {
		Nav
	}
}

if (module.hot) {
  module.hot.accept();
}
</script>
