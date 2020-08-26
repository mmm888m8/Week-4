export default {
    template: `
    <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li v-for="i in pagination.total_pages" :key="i" class="page-item" :class="{active: pagination.current_page === i}"><a @click.prevent="paginationUpdate(i)" class="page-link" href="#">{{ i }}</a></li>
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
        </ul>
    </nav>
    `,
    props: ['pagination'],
    methods: {
        paginationUpdate(pageNum) {
            this.$emit('pagination-update', pageNum);
        }
    }
};