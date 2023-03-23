<template>
    <footer class="footer has-cards">
      <div class="container">
        <div class="row row-grid align-items-center my-md">
          <div class="col-lg-6">
            <h3 class="text-primary font-weight-light mb-2">Vielen Dank für Ihre Unterstützung!</h3>
            <h4 class="mb-0 font-weight-light">Bleiben Sie mit uns in Verbindung über eine dieser Plattformen.</h4>
          </div>
          <div class="col-lg-6 text-lg-center btn-wrapper">
            <a target="_blank" rel="noopener" href="https://twitter.com/WillParken"
               class="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg" data-toggle="tooltip"
               data-original-title="Folgen Sie uns">
              <i class="fa fa-twitter"></i>
            </a>
            <a target="_blank" rel="noopener" href="https://www.facebook.com/WillParken"
               class="btn btn-neutral btn-icon-only btn-facebook btn-round btn-lg" data-toggle="tooltip"
               data-original-title="Gefällt mir">
              <i class="fa fa-facebook-square"></i>
            </a>
            <a target="_blank" rel="noopener" href="https://github.com/WillParken"
               class="btn btn-neutral btn-icon-only btn-github btn-round btn-lg" data-toggle="tooltip"
               data-original-title="Star auf Github">
              <i class="fa fa-github"></i>
            </a>
          </div>
        </div>
        <hr>
        <div class="row align-items-center justify-content-md-between">
          <div class="col-md-6">
            <div class="copyright">
              &copy; {{year}}
              <a href="https://www.willparken.de" target="_blank" rel="noopener">WillParken</a>
            </div>
          </div>
          <div class="col-md-6">
            <ul class="nav nav-footer justify-content-end">
              <li class="nav-item">
                <a href="https://www.willparken.de" class="nav-link" target="_blank" rel="noopener">WillParken</a>
              </li>
              <li class="nav-item">
                <a href="https://www.willparken.de/about" class="nav-link" target="_blank" rel="noopener">Über uns</a>
              </li>
              <li class="nav-item">
                <a href="https://www.willparken.de/blog" class="nav-link" target="_blank" rel="noopener">Blog</a>
              </li>
              <li class="nav-item">
                <a href="https://www.willparken.de/terms-of-use" class="nav-link" target="_blank" rel="noopener">Nutzungsbedingungen</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </template>
<script>
export default {
  name: 'app-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
