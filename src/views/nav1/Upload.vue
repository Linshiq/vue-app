<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.fileName" placeholder="文件名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getData">查询</el-button>
				</el-form-item>
			</el-form>
			<el-upload class="upload-demo" ref="upload" :action="url" :on-preview="handlePreview" :on-remove="handleRemove"
			 :on-success="uploadOnSuccess" :on-error="uploadOnError" :file-list="fileList" :auto-upload="false" name="files">
				<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
				<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="filesData" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="id" label="ID" v-if="false" width="120" sortable>
				</el-table-column>
				<el-table-column prop="upload_date" label="上传日期" width="200" sortable>
				</el-table-column>
				<el-table-column prop="file_name" label="文件名称" width="200" sortable>
				</el-table-column>
				<el-table-column prop="file_path" label="文件上传路径" width="200" sortable>
				</el-table-column>
				<el-table-column prop="is_save" label="是否已保存" width="200" :formatter="formatSave" sortable>
				</el-table-column>
				<el-table-column prop="is_delete" label="是否已删除" min-width="200" :formatter="formatDelete" sortable>
				</el-table-column>
				<el-table-column prop="upload_use_id" label="上传者ID" min-width="100" sortable>
				</el-table-column>
				<el-table-column prop="remark" label="备注" min-width="180" sortable>
				</el-table-column>
				<el-table-column prop="create_time" label="创建时间" min-width="180" sortable>
				</el-table-column>
				<el-table-column prop="update_time" label="更新时间" min-width="180" sortable>
				</el-table-column>
			</el-table>
		</template>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total">
				<!--style="float:right;"-->
			</el-pagination>

		</el-col>
	</section>
</template>
<script>
	import axiosUtil from '../../common/js/axiosUtil.js';

	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				total: 0,
				pageSize: this.$pageSize,
				page: 1,
				filters: {
					fileName: ''
				},
				loading: false,
				filesData: [],
				fileList: [],
				url: ''
			}
		},
		methods: {
			//性别显示转换
			formatSave: function(row, column) {
				return row.is_save == 'N' ? '否' : row.is_save == 'Y' ? '是' : '未知';
			},
			formatDelete: function(row, column) {
				return row.is_delete == 'N' ? '否' : row.is_delete == 'Y' ? '是' : '未知';
			},
			handleCurrentChange: function(page) {
				this.page = page;
				this.getData();
			},
			submitUpload(file) {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			uploadOnError() {
				this.$message.warning("图片上传出错！")
			},
			uploadOnSuccess(msg) {
				//图片上传成功
				this.$message.success(msg.info)
			},
			getData: function() {
				let para = {
					fileName: this.filters.fileName
				};
				this.loading = true;
				this.loading = false;
				var url = this.$serviceIpAddr + '/';
				//let para = Object.assign({},this.form);
				var _this = this;
				var page = this.page;
				var pageSize = this.pageSize;
				this.billData = [];
				axiosUtil.getAxiosPagePost(_this, url, '9001', para, page, pageSize)
					.then(function(response) {
						debugger;

						var data = JSON.parse(response.data.output);
						_this.filesData = data.details;
						_this.total = response.data.total;
						console.log("响应" + _this.filesData);
						axiosUtil.successMessage(_this, '查询成功');
					})
					.catch(function(error) {
						console.log("错误" + error);
					});
			}
		},
		mounted() {
			this.url = this.$serviceIpAddr + '/upload/uuuu';
			this.getData();
			console.log(this.url);
		}
	};
</script>

<style scoped>

</style>
