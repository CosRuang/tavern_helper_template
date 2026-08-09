<template>
  <div class="worldbar">
    <div class="worldbar__crest">
      <i class="fa-solid fa-crown" aria-hidden="true" />
      <span class="worldbar__castle">蔷薇古堡</span>
    </div>

    <div class="worldbar__item">
      <i class="fa-regular fa-clock" aria-hidden="true" />
      <span>{{ world.当前时间 }}</span>
    </div>

    <div class="worldbar__item">
      <i class="fa-solid fa-location-dot" aria-hidden="true" />
      <span>{{ world.当前区域 }}</span>
    </div>

    <div v-if="world.宴会状态 !== '无'" class="worldbar__item worldbar__item--feast">
      <i class="fa-solid fa-champagne-glasses" aria-hidden="true" />
      <span>宴会·{{ world.宴会状态 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const world = store.data.世界;
</script>

<style lang="scss" scoped>
.worldbar {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  padding: 8px 14px;
  background: var(--c-surface-2);
  border-bottom: 1px solid var(--c-border);
  font-family: var(--font-body);
  font-size: 12px;
}

.worldbar__crest {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--c-primary);
  font-family: var(--font-title);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 2px;
}

.worldbar__castle {
  color: var(--c-text);
}

.worldbar__item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--c-text-muted);
  white-space: nowrap;
}

.worldbar__item i {
  color: var(--c-primary);
  font-size: 11px;
}

.worldbar__item--feast {
  color: var(--c-accent);
  font-weight: 600;
}

.worldbar__item--feast i {
  color: var(--c-accent);
}
</style>
