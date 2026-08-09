<template>
  <div class="castle">
    <section class="castle__section">
      <h4 class="castle__subtitle"><i class="fa-solid fa-scroll" aria-hidden="true" />近期目标</h4>
      <p class="castle__goal">{{ world.近期目标 }}</p>
    </section>

    <section class="castle__section">
      <h4 class="castle__subtitle"><i class="fa-solid fa-handcuffs" aria-hidden="true" />先堕者</h4>
      <p class="castle__fallen">
        <template v-if="sys.先堕者 === '未定'">尚未有人完成堕落。第一枚棋子落下后，ta 将成为驯养另一人的共犯。</template>
        <template v-else>{{ sys.先堕者 }}已先一步沉沦，正以「关心」为名协助调教另一方。</template>
      </p>
    </section>

    <section class="castle__section">
      <h4 class="castle__subtitle"><i class="fa-solid fa-book-skull" aria-hidden="true" />事件日志</h4>
      <ol v-if="world.事件日志.length" class="castle__log">
        <li v-for="(log, i) in world.事件日志" :key="`${i}-${log}`" class="castle__log-item">
          <span class="castle__log-bullet" />{{ log }}
        </li>
      </ol>
      <p v-else class="castle__empty">城堡尚无大事发生，一切如常。</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const world = store.data.世界;
const sys = store.data.系统;
</script>

<style lang="scss" scoped>
.castle {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.castle__section {
  background: var(--c-surface-2);
  border: 1px solid var(--c-border);
  padding: 10px 12px;
  border-radius: 2px;
}

.castle__subtitle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-title);
  font-size: 13px;
  letter-spacing: 1px;
  color: var(--c-primary);
  margin-bottom: 8px;
  border-bottom: 1px dashed var(--c-border);
  padding-bottom: 4px;
}

.castle__goal {
  font-size: 12px;
  line-height: 1.6;
  color: var(--c-text);
}

.castle__fallen {
  font-size: 12px;
  line-height: 1.6;
  color: var(--c-accent);
}

.castle__log {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 220px;
  overflow-y: auto;
}

.castle__log-item {
  display: flex;
  gap: 7px;
  align-items: baseline;
  font-size: 12px;
  line-height: 1.5;
  color: var(--c-text);
}

.castle__log-bullet {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-primary);
  transform: translateY(-1px);
}

.castle__empty {
  font-size: 12px;
  color: var(--c-text-muted);
}
</style>
