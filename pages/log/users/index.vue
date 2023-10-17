<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 layout-spacing">
                        <div class="widget widget-five">

                            <div class="widget-heading">

                                <a href="javascript:void(0)" class="task-info">

                                    <div class="usr-avatar">
                                        <span>FD</span>
                                    </div>

                                    <div class="w-title">

                                        <h5>Figma Design</h5>
                                        <span>Design Project</span>

                                    </div>

                            </a>

                            <div class="task-action">
                                <div class="dropdown">
                                    <a class="dropdown-toggle" href="#" role="button" id="pendingTask"
                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-more-horizontal">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="19" cy="12" r="1"></circle>
                                            <circle cx="5" cy="12" r="1"></circle>
                                        </svg>
                                    </a>

                                    <div class="dropdown-menu left" aria-labelledby="pendingTask"
                                        style="will-change: transform;">
                                        <a class="dropdown-item" href="javascript:void(0);">View Project</a>
                                        <a class="dropdown-item" href="javascript:void(0);">Edit Project</a>
                                        <a class="dropdown-item" href="javascript:void(0);">Mark as Done</a>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div class="widget-content">

                            <p>Doloribus nisi vel suscipit modi, optio ex repudiandae voluptatibus officiis commodi.</p>

                            <div class="progress-data">

                                <div class="progress-info">
                                    <div class="task-count"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-check-square">
                                            <polyline points="9 11 12 14 22 4"></polyline>
                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                        </svg>
                                        <p>5 Tasks</p>
                                    </div>
                                    <div class="progress-stats">
                                        <p>86.2%</p>
                                    </div>
                                </div>

                                <div class="progress">
                                    <div class="progress-bar bg-primary" role="progressbar" style="width: 65%"
                                        aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>

                            </div>

                            <div class="meta-info">

                                <div class="due-time">
                                    <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-clock">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg> 3 Days Left</p>
                                </div>


                                <div class="avatar--group">

                                    <div class="avatar translateY-axis more-group">
                                        <span class="avatar-title">+6</span>
                                    </div>
                                    <div class="avatar translateY-axis">
                                        <img alt="avatar" src="/img/profile-8.jpeg" />
                                    </div>
                                    <div class="avatar translateY-axis">
                                        <img alt="avatar" src="/img/profile-12.jpeg" />
                                    </div>
                                    <div class="avatar translateY-axis">
                                        <img alt="avatar" src="/img/profile-19.jpeg" />
                                    </div>

                                </div>

                            </div>


                        </div>

                    </div>

                </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing">
                        <div class="widget widget-card-four">
                            <div class="widget-content">
                         <LogFitter></LogFitter>
                            </div>
                        </div>
                    </div>
            </div>
        </div>

    </div>
    <!--  BEGIN FOOTER  -->

    <!--  END FOOTER  -->
</div></template>
<script setup lang="ts">
/*Call Components*/
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import LogFitter from '@/components/log/LogFitter.vue'

definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory 
})


</script>
<style scoped></style>