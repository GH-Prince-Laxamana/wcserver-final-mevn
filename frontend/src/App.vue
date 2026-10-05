<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container">
        <a class="navbar-brand font-weight-bold" href="#"
          >MEVN CRUD Application</a
        >
        <ul class="nav navbar-nav flex-row float-right ml-auto">
          <li class="nav-item mr-3">
            <router-link class="nav-link" to="/">Create Student</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/view">View Students</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Router View renders the active component -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>
