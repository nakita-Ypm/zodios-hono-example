deps:
	cp packages/prisma/.env.example packages/prisma/.env
	rm -rf node_modules && rm -rf pnpm-lock.yaml && pnpm install
	
run:
	pnpm -F @apps/hono dev