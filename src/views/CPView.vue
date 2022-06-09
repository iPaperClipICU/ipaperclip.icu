<template>
  <n-card size="huge">
    <n-page-header :subtitle="mail">
      <n-grid :cols="12" item-responsive>
        <n-gi :span="4">
          <n-statistic label="UID">
            {{ uid }}
          </n-statistic>
        </n-gi>
        <n-gi :span="4">
          <n-statistic label="解析">
            {{ parsing[0] }} / {{ parsing[1] }}
          </n-statistic>
        </n-gi>
        <n-gi :span="4"></n-gi>
        <n-gi :span="4"></n-gi>
      </n-grid>
      <template #title>{{ userName }}</template>
      <template #avatar>
        <n-avatar :src="userHead" />
      </template>
      <template #footer>
        <n-space>
          <n-button>修改邮箱</n-button>
          <n-button>修改密码</n-button>
          <n-button>退出账号</n-button>
        </n-space>
      </template>
    </n-page-header>
  </n-card>
  <n-grid :cols="12" item-responsive>
    <n-gi span="0 570:12">
      <n-card size="huge" title="解析列表" style="margin-top: 15px">
        <template #header-extra>
          <n-button @click="showAddResolution = true" type="primary" ghost>
            新增解析
          </n-button>
        </template>
        <n-data-table :columns="columns" :data="data" />
      </n-card>
    </n-gi>
    <n-gi span="12 570:0">
      <n-card size="small" title="解析列表" style="margin-top: 6px">
        <template #header-extra>
          <n-button
            @click="showAddResolution = true"
            size="small"
            type="primary"
            ghost
          >
            新增解析
          </n-button>
        </template>
      </n-card>
      <n-card
        v-for="(item, index) in data"
        :key="index"
        size="small"
        :title="item.note"
        style="margin-top: 6px"
      >
        <template #header-extra>#{{ item.id }}</template>
        <p>域名: {{ item.domain }}</p>
        <p>服务器: {{ item.serve }}:{{ item.servePort }}</p>
        <n-space justify="end">
          <n-button
            tertiary
            type="primary"
            size="small"
            @click="showEditButtonClick(item)"
          >
            编辑
          </n-button>
        </n-space>
      </n-card>
    </n-gi>
  </n-grid>
  <n-modal
    v-model:show="showEditResolution"
    class="custom-card"
    preset="card"
    :style="{ width: '700px' }"
    title="新增解析"
    size="huge"
    :bordered="false"
  >
    <CPResolutionList :data="editResolutionModalData" />
  </n-modal>
  <n-modal
    v-model:show="showAddResolution"
    class="custom-card"
    preset="card"
    :style="{ width: '700px' }"
    title="新增解析"
    size="huge"
    :bordered="false"
  >
    <CPAddResolution />
  </n-modal>
</template>

<script>
import { h, ref, defineComponent } from "vue";
import axios from "axios";
import router from "@/router";
import VueCookies from "vue-cookies";
import CPAddResolution from "@/components/CP/CPAddResolution.vue";
import CPResolutionList from "@/components/CP/CPResolutionList.vue";
import MD5 from "crypto-js/md5";
import {
  NGi,
  NGrid,
  NCard,
  NSpace,
  NModal,
  NButton,
  NAvatar,
  NDataTable,
  NStatistic,
  NPageHeader,
} from "naive-ui";
import { useMessage } from "naive-ui";

const Init = () => {
  // 是否有SESSDATA
  var sessdata = VueCookies.get("SESSDATA");
  if (sessdata == null) {
    VueCookies.remove("SESSDATA");
    window.$message.error("请先登录/注册");
    router.push("/");
    return;
  }
  const params = new URLSearchParams();
  params.append("sessdata", sessdata);
  axios.post("http://192.168.1.133:7799/api/cp", params).then((resp) => {
    const json = resp.data;
    if (resp.status == 200) {
      if (json.code == 200) {
        // 200
        uid.value = json.data.user.UID;
        parsing.value = [
          json.data.resolution.data.length,
          Number(json.data.resolution.max),
        ];
        mail.value = json.data.user.mail;
        userName.value = json.data.user.name;
        userHead.value =
          "https://gravatar.hsyhx.top/avatar/" +
          MD5(json.data.user.mail).toString();

        for (var i in json.data.resolution.data) {
          const tmp = json.data.resolution.data[i];
          createData.value.push({
            key: i,
            id: tmp.RID,
            note: tmp.note,
            domain: tmp.domain_prefix + ".mc.cfd",
            serve: tmp.serve,
            servePort: tmp.serve_port,
          });
        }
      } else if (json.code == 403) {
        // SESSDATA过期
        VueCookies.remove("SESSDATA");
        window.$message.error(json.msg);
        router.push("/");
      } else {
        window.$message.error(json.msg);
      }
    } else {
      //请求API失败
      window.$message.error("请求API失败 " + resp.status);
    }
  });
};

var createData = ref([]);

const uid = ref(0); //UID
const parsing = ref([0, 5]); //解析 0/5
const mail = ref(""); //邮箱
const userName = ref(""); //用户名
const userHead = ref(""); //用户头像
const showAddResolution = ref(false); //新增域名解析面板
const showEditResolution = ref(false); //编辑域名解析面板
const editResolutionModalData = ref(""); //编辑域名解析面板数据
export default defineComponent({
  components: {
    CPAddResolution,
    CPResolutionList,
    // NaiveUI
    NGi,
    NGrid,
    NCard,
    NSpace,
    NModal,
    NButton,
    NAvatar,
    NDataTable,
    NStatistic,
    NPageHeader,
  },
  setup() {
    window.$message = useMessage();
    Init();
    return {
      uid,
      mail,
      parsing,
      userName,
      userHead,
      showAddResolution,
      showEditResolution,
      editResolutionModalData,
      data: createData,
      columns: [
        {
          type: "expand",
          renderExpand: (rowData) => {
            return h(CPResolutionList, {
              data: {
                id: rowData.id,
                note: rowData.note,
                domain: rowData.domain,
                serve: rowData.serve,
                servePort: rowData.servePort,
              },
            });
          },
        },
        {
          title: "ID",
          key: "id",
        },
        {
          title: "备注",
          key: "note",
        },
        {
          title: "域名",
          key: "domain",
        },
        {
          title: "服务器域名/IP",
          key: "serve",
        },
        {
          title: "服务器端口",
          key: "servePort",
        },
      ],
      showEditButtonClick(data) {
        editResolutionModalData.value = data;
        showEditResolution.value = true;
      },
    };
  },
});
</script>
