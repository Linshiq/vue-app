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
			<el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>
		</el-col>
		<!--列表-->
		<template>
			<el-table :data="reviewData" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				</el-table-column>
				<el-table-column prop="info" label="备注" min-width="180" sortable>
				</el-table-column>
				<el-table-column prop="steps" label="进度" min-width="180" sortable>
				</el-table-column>
				<el-table-column label="操作" min-width="180">
					<template scope="scope">
							<el-button size="small" @click="versionInfo(scope.$index, scope.row,'changeContent')">审核步骤</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total">
					<!--style="float:right;"-->
				</el-pagination>

			</el-col>

		</template>

		<el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
			<el-steps :active="active" align-center>
				<el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
				<el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
				<el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
				<el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
			</el-steps>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>

	</section>
</template>
<script>
	import axiosUtil from '../../common/js/axiosUtil.js';

	export default {
		data() {
			return {
				total: 0,
				pageSize: this.$pageSize,
				page: 1,
				filters: {
					name: ''
				},
				loading: false,
				centerDialogVisible: false,
				users: [],
				reviewData: [],
				active: 1,
			}
		},
		methods: {
			//性别显示转换
			formatSex: function(row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange: function(page) {
				this.page = page;
				this.getData();
			},
			versionInfo: function(index,row,obj) {
				this.centerDialogVisible = true;
				this.active = row.steps;
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
				this.reviewData = [
					{
						"info":"test1",
						"steps":"1",
					},
					{
						"info":"test2",
						"steps":"2",
					}
				];
				
			}
		},
		mounted() {
			this.getData();
		}
	};
</script>

<style scoped>

</style>
