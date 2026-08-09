<template>
  <div v-if="data" class="panel" :class="`panel--${accent}`">
    <!-- 称号区 -->
    <section class="panel__section">
      <div class="panel__title-row">
        <h3 class="panel__name">{{ role }}</h3>
        <span class="panel__stage-badge">{{ data.阶段称号 }}</span>
      </div>
      <div v-if="data.动态称号.length" class="kinks">
        <span v-for="t in data.动态称号" :key="t" class="chip chip--title">
          <i class="fa-solid fa-medal" aria-hidden="true" />{{ t }}
        </span>
      </div>
    </section>

    <!-- 三数值 -->
    <section class="panel__section">
      <div v-for="stat in stats" :key="stat.key" class="stat">
        <div class="stat__label">
          <span>{{ stat.label }}</span>
          <span class="stat__value" :class="{ 'stat__value--deep': stat.value >= 75 }">{{ stat.value }}</span>
        </div>
        <div class="stat__track">
          <div
            class="stat__fill"
            :class="{ 'stat__fill--deep': stat.value >= 75 }"
            :style="{ width: `${stat.value}%` }"
          />
        </div>
      </div>
      <div class="panel__hint">阶段 {{ data.阶段 }} / 6</div>
    </section>

    <!-- 档案 -->
    <section class="panel__section">
      <div class="kv"><span class="kv__k">着装</span><span class="kv__v">{{ data.着装 }}</span></div>
      <div class="kv"><span class="kv__k">状态</span><span class="kv__v">{{ data.状态 }}</span></div>
    </section>

    <!-- 身体部位开发 -->
    <section class="panel__section">
      <h4 class="panel__subtitle"><i class="fa-solid fa-venus-mars" aria-hidden="true" />身体部位开发</h4>
      <div class="bodygrid">
        <div v-for="part in partEntries" :key="part[0]" class="part" :class="`part--${partLevel(part[1].开发状态)}`">
          <div class="part__head">
            <span class="part__name">{{ part[0] }}</span>
            <span class="part__level">{{ part[1].开发状态 }}</span>
          </div>
          <div class="part__dots">
            <span
              v-for="i in 5"
              :key="i"
              class="part__dot"
              :class="{ 'part__dot--on': i <= levelIndex(part[1].开发状态) }"
            />
          </div>
          <div v-if="part[1].道具 !== '无'" class="part__gear">
            <i class="fa-solid fa-link" aria-hidden="true" />{{ part[1].道具 }}
          </div>
          <div v-if="part[1].备注" class="part__note">{{ part[1].备注 }}</div>
        </div>
      </div>
    </section>

    <!-- 穿戴道具 -->
    <section v-if="data.穿戴道具.length" class="panel__section">
      <h4 class="panel__subtitle"><i class="fa-solid fa-shield-halved" aria-hidden="true" />正穿戴道具</h4>
      <div class="kinks">
        <span v-for="g in data.穿戴道具" :key="g" class="chip chip--gear">
          <i class="fa-solid fa-link" aria-hidden="true" />{{ g }}
        </span>
      </div>
    </section>

    <!-- 性癖 -->
    <section v-if="data.性癖.length" class="panel__section">
      <h4 class="panel__subtitle"><i class="fa-solid fa-flask" aria-hidden="true" />已开发性癖</h4>
      <div class="kinks">
        <span v-for="k in data.性癖" :key="k" class="chip chip--kink">{{ k }}</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Schema } from '../../schema';
import { useDataStore } from '../store';

const props = defineProps<{
  role: '伊莲娜' | '里克';
  accent: 'silk' | 'rose';
}>();

const store = useDataStore();

const data = computed(() => store.data[props.role]);

const LEVELS = ['未开发', '初觉', '适应', '沉溺', '彻底开发'] as const;

const stats = computed(() => [
  { key: '堕落值', label: '堕落值', value: data.value?.堕落值 ?? 0 },
  { key: '忠诚度', label: '忠诚度', value: data.value?.忠诚度 ?? 0 },
  { key: '淫乱度', label: '淫乱度', value: data.value?.淫乱度 ?? 0 },
]);

const partEntries = computed(() => Object.entries((data.value?.身体部位 ?? {}) as Record<string, { 开发状态: string; 道具: string; 备注: string }>));

function levelIndex(level: string): number {
  const i = LEVELS.indexOf(level as (typeof LEVELS)[number]);
  return i < 0 ? 0 : i;
}

function partLevel(level: string): string {
  return levelIndex(level) >= 3 ? 'deep' : levelIndex(level) >= 1 ? 'touched' : 'virgin';
}
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel__section {
  background: var(--c-surface-2);
  border: 1px solid var(--c-border);
  padding: 10px 12px;
  border-radius: 2px;
}

.panel__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.panel__name {
  font-family: var(--font-title);
  font-size: 20px;
  letter-spacing: 3px;
  color: var(--c-text);
}

.panel__stage-badge {
  padding: 2px 10px;
  font-family: var(--font-title);
  font-size: 12px;
  letter-spacing: 1px;
  color: var(--c-surface);
  background: var(--c-primary);
  border-radius: 10px;
  white-space: nowrap;
}

.panel--rose .panel__stage-badge {
  background: var(--c-rose);
}

.panel__hint {
  margin-top: 6px;
  text-align: right;
  font-size: 11px;
  color: var(--c-text-muted);
}

/* 数值条 */
.stat {
  margin-bottom: 8px;
}

.stat:last-of-type {
  margin-bottom: 0;
}

.stat__label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 12px;
  color: var(--c-text);
  margin-bottom: 3px;
}

.stat__value {
  font-family: var(--font-title);
  font-size: 14px;
  font-weight: 700;
  color: var(--c-primary);
}

.panel--rose .stat__value {
  color: var(--c-rose);
}

.stat__value--deep {
  color: var(--c-accent) !important;
  text-shadow: 0 0 8px rgba(139, 0, 0, 0.7);
}

.stat__track {
  height: 6px;
  background: var(--c-surface-3);
  border-radius: 3px;
  overflow: hidden;
}

.stat__fill {
  height: 100%;
  background: var(--c-primary);
  border-radius: 3px;
  transition: width 0.6s ease;
}

.panel--rose .stat__fill {
  background: var(--c-rose);
}

.stat__fill--deep {
  background: var(--c-accent) !important;
  box-shadow: 0 0 8px rgba(139, 0, 0, 0.8);
}

/* 档案 */
.kv {
  display: flex;
  gap: 8px;
  font-size: 12px;
  line-height: 1.6;
}

.kv + .kv {
  margin-top: 4px;
}

.kv__k {
  flex-shrink: 0;
  color: var(--c-text-muted);
  letter-spacing: 1px;
}

.kv__v {
  color: var(--c-text);
}

/* 小节标题 */
.panel__subtitle {
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

.panel--rose .panel__subtitle {
  color: var(--c-rose);
}

/* 身体部位网格 */
.bodygrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));
  gap: 6px;
}

.part {
  background: var(--c-surface-3);
  border: 1px solid var(--c-border);
  border-radius: 2px;
  padding: 5px 7px;
  min-height: 46px;
}

.part__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
}

.part__name {
  font-size: 12px;
  color: var(--c-text);
}

.part__level {
  font-size: 10px;
  color: var(--c-text-muted);
}

.part__dots {
  display: flex;
  gap: 3px;
  margin-top: 4px;
}

.part__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--c-border);
}

.part__dot--on {
  background: var(--c-primary);
}

.panel--rose .part__dot--on {
  background: var(--c-rose);
}

.part--deep .part__dot--on {
  background: var(--c-accent);
}

.part__gear,
.part__note {
  margin-top: 4px;
  font-size: 10px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--c-text-muted);
}

.part__gear i {
  color: var(--c-primary);
  font-size: 9px;
}

.panel--rose .part__gear i {
  color: var(--c-rose);
}

.part--deep .part__gear {
  color: var(--c-accent);
}

/* 标签 */
.kinks {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 9px;
  border-radius: 10px;
  font-size: 11px;
  border: 1px solid var(--c-border);
  background: var(--c-surface-3);
  color: var(--c-text);
}

.chip i {
  font-size: 9px;
  color: var(--c-text-muted);
}

.chip--title {
  color: var(--c-primary);
  border-color: rgba(184, 134, 11, 0.4);
}

.panel--rose .chip--title {
  color: var(--c-rose);
  border-color: rgba(199, 107, 138, 0.4);
}

.chip--gear i {
  color: var(--c-primary);
}

.panel--rose .chip--gear i {
  color: var(--c-rose);
}

.chip--kink {
  color: var(--c-accent);
  border-color: rgba(139, 0, 0, 0.4);
}
</style>
