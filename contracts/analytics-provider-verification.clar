;; Analytics Provider Verification Contract
;; Validates and manages marketing analytics providers

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-provider-exists (err u101))
(define-constant err-provider-not-found (err u102))
(define-constant err-invalid-reputation (err u103))

;; Provider data structure
(define-map providers
  { provider-id: uint }
  {
    address: principal,
    name: (string-ascii 50),
    reputation-score: uint,
    verified: bool,
    registration-block: uint
  }
)

(define-data-var next-provider-id uint u1)

;; Register a new analytics provider
(define-public (register-provider (name (string-ascii 50)))
  (let ((provider-id (var-get next-provider-id)))
    (asserts! (is-none (map-get? providers { provider-id: provider-id })) err-provider-exists)
    (map-set providers
      { provider-id: provider-id }
      {
        address: tx-sender,
        name: name,
        reputation-score: u50,
        verified: false,
        registration-block: block-height
      }
    )
    (var-set next-provider-id (+ provider-id u1))
    (ok provider-id)
  )
)

;; Verify a provider (owner only)
(define-public (verify-provider (provider-id uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (match (map-get? providers { provider-id: provider-id })
      provider-data
      (begin
        (map-set providers
          { provider-id: provider-id }
          (merge provider-data { verified: true })
        )
        (ok true)
      )
      err-provider-not-found
    )
  )
)

;; Update provider reputation
(define-public (update-reputation (provider-id uint) (new-score uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (<= new-score u100) err-invalid-reputation)
    (match (map-get? providers { provider-id: provider-id })
      provider-data
      (begin
        (map-set providers
          { provider-id: provider-id }
          (merge provider-data { reputation-score: new-score })
        )
        (ok true)
      )
      err-provider-not-found
    )
  )
)

;; Get provider information
(define-read-only (get-provider (provider-id uint))
  (map-get? providers { provider-id: provider-id })
)

;; Check if provider is verified
(define-read-only (is-provider-verified (provider-id uint))
  (match (map-get? providers { provider-id: provider-id })
    provider-data (get verified provider-data)
    false
  )
)
