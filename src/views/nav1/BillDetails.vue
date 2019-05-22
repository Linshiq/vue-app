<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getData">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="billData" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="detail_id" label="明细ID" v-if="false" width="120" sortable>
				</el-table-column>
				<el-table-column prop="uesr_id" label="用户所属ID" v-if="false" width="140" sortable>
				</el-table-column>
				<el-table-column prop="record_date" label="记录日期" width="120" sortable>
				</el-table-column>
				<el-table-column prop="relatif_time" label="相对时间" width="120" sortable>
				</el-table-column>
				<el-table-column prop="detail_type" label="明细类型" min-width="180" sortable>
				</el-table-column>
				<el-table-column prop="detail_remark" label="明细备注" min-width="180" sortable>
				</el-table-column>
				<el-table-column prop="amount" label="金额" min-width="180" sortable>
				</el-table-column>
				<el-table-column prop="remark" label="备注" min-width="180" sortable>
				</el-table-column>
				<el-table-column prop="create_time" label="创建时间" min-width="180" sortable>
				</el-table-column>
				<el-table-column prop="update_time" label="更新时间" min-width="180" sortable>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total">
					<!--style="float:right;"-->
				</el-pagination>

			</el-col>

		</template>

	</section>
</template>
<script>
	import axiosUtil from '../../common/js/axiosUtil.js';

	export default {
		data() {
			return {
				total: 0,
				pageSize: this.$pageSize,
				page:1,
				filters: {
					name: ''
				},
				loading: false,
				users: [],
				billData: []
			}
		},
		methods: {
			//性别显示转换
			formatSex: function(row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange: function(page){
				this.page = page;
				this.getData();
			},
			getData: function() {
				let para = {
					name: this.filters.name
				};
				this.loading = true;
				this.loading = false;
				var url = this.$serviceIpAddr + '/';
				//let para = Object.assign({},this.form);
				var _this = this;
				var page = this.page;
				var pageSize = this.pageSize;
				this.billData = [];
				axiosUtil.getAxiosPagePost(_this, url, '2000', para,page,pageSize)
					.then(function(response) {
						debugger;
						
						var data = JSON.parse(response.data.output);
						_this.billData = data.details;
						_this.total = response.data.total;
						console.log("响应" + _this.billData);
						axiosUtil.successMessage(_this,'查询成功');
					})
					.catch(function(error) {
						console.log("错误" + error);
						axiosUtil.successMessage(_this, '查询失败'+error);
					});
			}
		},
		mounted() {
			this.getData();
		}
	};
</script>

<style scoped>

</style>
