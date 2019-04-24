const app = new Vue({
	el: '#app',
	data: {
		message: 'TodoMVC',
		todos: [
			// { id: 1, title: '(ง •_•)ง', completed: false },
			// { id: 2, title: '(￣︶￣*))', completed: true }
		],
		todos:JSON.parse(window.localStorage.getItem('todos') || '[]' ),
		currentEditing: null,
		filterText:'all'
	},
	methods: {
		// 添加
		add(e) {
			const inputVal = e.target.value

			if (inputVal.length === 0) {
				return
			} else {
				this.todos.push({
					id: Math.random(),
					title: inputVal,
					completed: false,
				})
				e.target.value = ''

				window.localStorage.setItem('todos',JSON.stringify(this.todos))
			}
		},
		// 单个删除
		del(index) {
			this.todos.splice(index, 1)
			window.localStorage.setItem('todos',JSON.stringify(this.todos))
		},
		// 未完成数量
		Untreated() {
			return this.todos.filter(item => item.completed === false).length
		},
		// 选中删除 展示
		clearCompletedShow() {
			return this.todos.some(item => item.completed === true)
		},
		// 选中删除 删除
		clearCompleted() {
			const todos = this.todos
			for (let i = 0; i < todos.length; i++) {
				const item = todos[i]
				if (item.completed === true) {
					todos.splice(i, 1)
					i--
				}
			}
			window.localStorage.setItem('todos',JSON.stringify(this.todos))
		},
		// 全部选中切换
		toggleAllChecked(e) {
			const checked = e.target.checked
			this.todos.forEach(item => {
				item.completed = checked
			})
		},
		// 判断全选
		checkedAll() {
			return this.todos.every(item => item.completed === true)
		},
		// 获取编辑状态
		getEditing(item) {
			this.currentEditing = item
		},
		// 保存编辑
		saveEdit(item,index,e) {
			const inputVal = e.target.value
			if(inputVal.length === 0) {
				this.todos.splice(index,1)
			} else {
				item.title = inputVal
			}
			this.currentEditing = null
		},

		filtersToods() {
			switch(this.filterText) {
				case 'active':
				return this.todos.filter(item => item.completed === true)
					break
				case 'completed':
				return this.todos.filter(item => item.completed === false)
					break
				default :
				return this.todos
					break
			}
		}
	},
})


window.onhashchange = function () {
	const hash = window.location.hash
	switch (hash) {
		case '#/':
			app.filterText = 'all'
			break
		case '#/completed':
			app.filterText = 'completed'
			break
		case '#/active':
		 app.filterText = 'active'
			break
	}
}