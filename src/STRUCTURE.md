# Web3 Skills RiWoT - Project Structure

## 📁 Directory Structure

```
web3skills/
├── /                          # Root directory
│   ├── App.tsx               # Main application component (1900+ lines)
│   ├── README.md             # Project documentation
│   ├── STRUCTURE.md          # This file - project structure guide
│   └── package.json          # Dependencies and scripts
│
├── /styles/                  # Styling files
│   └── globals.css          # Global styles with Tailwind + animations
│
└── /public/                  # Static assets
    └── (images, icons)
```

---

## 🏗️ Application Architecture

### **Component Hierarchy**

```
App (Main)
├── Navigation
│   ├── Desktop Menu
│   └── Mobile Menu (hamburger)
│
├── Views (Conditional Rendering)
│   ├── HomePage
│   │   ├── View Mode Banner (if viewing shared)
│   │   ├── Hero Section
│   │   ├── Stats Cards (3)
│   │   ├── Quick Actions (2 cards)
│   │   ├── RiWoT Community Section
│   │   └── Data Management (Import/Export)
│   │
│   ├── SkillsView
│   │   ├── Search & Filters
│   │   └── Skill Categories (16)
│   │       └── Individual Skills (200+)
│   │
│   ├── CareersView
│   │   ├── EVM Careers (6)
│   │   ├── Solana Careers (2)
│   │   └── Cross-chain Careers (1)
│   │
│   └── CareerDetailView
│       ├── Career Header
│       ├── Progress Indicator
│       ├── Required Skills
│       ├── 4-Phase Roadmap
│       │   ├── Phase Skills
│       │   └── Learning Resources
│       └── Career Outcomes
│
├── Modals
│   ├── ShareModal (with animations)
│   ├── ViewModal (with animations)
│   └── PolicyModal (first-time visitors)
│
└── Footer
    ├── GitHub Link
    ├── RiWoT Links
    └── Credits
```

---

## 📊 Data Structure

### **State Management**

```typescript
// Core State
skills: { [skillName: string]: boolean }  // 200+ skills
currentView: 'home' | 'skills' | 'careers' | 'career-detail'
selectedCareer: string | null
darkMode: boolean

// UI State
searchQuery: string
filterComplete: 'all' | 'complete' | 'incomplete'
expandedCategories: { [category: string]: boolean }
mobileMenuOpen: boolean

// Modal State
showShareModal: boolean
showViewModal: boolean
showPolicyModal: boolean

// Share & View
viewMode: boolean
sharedSkills: { [skillName: string]: boolean } | null
shareInput: string
copiedShare: boolean
```

### **Data Structures**

#### **Skill Categories** (16 categories, 200+ skills)
```typescript
{
  'Programming Languages': string[],      // 15 skills
  'Frontend Technologies': string[],      // 12 skills
  'Backend & API': string[],              // 10 skills
  'Development Tools': string[],          // 18 skills
  'Security Tools': string[],             // 12 skills
  'Cloud & DevOps': string[],             // 14 skills
  'Database & Systems': string[],         // 12 skills
  'EVM Blockchain & Web3': string[],      // 35 skills
  'Solana/SVM Blockchain': string[],      // 25 skills
  'Architecture & Design': string[],      // 15 skills
  'Security & Auditing': string[],        // 18 skills
  'Testing & QA': string[],               // 10 skills
  'Soft Skills': string[],                // 12 skills
  'Specialized Experience': string[],     // 25 skills
  'Full-Stack Development': string[]      // 10 skills
}
```

#### **Career Paths** (9 careers)
```typescript
{
  [careerName: string]: {
    icon: LucideIcon,
    ecosystem: 'EVM' | 'Solana' | 'Cross-chain',
    description: string,
    requiredSkills: string[],
    roadmap: Array<{
      phase: string,
      duration: string,
      skills: string[],
      resources: Array<{
        name: string,
        url: string,
        type: string,
        duration?: string
      }>
    }>,
    outcomes?: {
      junior?: string,
      mid?: string,
      senior?: string,
      lead?: string,
      bounty?: string
    }
  }
}
```

---

## 🔄 Data Flow

### **1. Initialization Flow**
```
User visits site
    ↓
Check localStorage
    ↓
├─ Policy accepted? → Load data
│                   → Initialize skills
│                   → Set dark mode
│                   → Expand categories
│
└─ Not accepted? → Show PolicyModal
                 → Wait for acceptance
                 → Then initialize
```

### **2. Skill Tracking Flow**
```
User clicks skill checkbox
    ↓
toggleSkill(skill)
    ↓
Update skills state
    ↓
useEffect triggers
    ↓
Save to localStorage
    ↓
UI updates:
    ├─ Progress bars
    ├─ Category counts
    ├─ Career matches
    └─ Best match calculation
```

### **3. Share Flow**
```
User clicks Share
    ↓
Show ShareModal (animated)
    ↓
User clicks Copy
    ↓
generateShareCode()
    ├─ Filter checked skills
    ├─ Convert to JSON
    ├─ Base64 encode
    └─ Copy to clipboard (with fallback)
    ↓
Show success feedback
```

### **4. View Flow**
```
User pastes share code
    ↓
Click "Load Progress"
    ↓
loadFromShareCode(code)
    ├─ Decode base64
    ├─ Parse JSON
    ├─ Create sharedSkills object
    └─ Set viewMode = true
    ↓
UI shows:
    ├─ View Mode Banner
    ├─ Read-only skills
    ├─ Career matches
    └─ Exit button
```

---

## 🎨 Styling System

### **Color Palette**
```css
/* EVM */
blue-600, blue-700, blue-400 (dark mode)

/* Solana */
purple-600, purple-700, purple-400 (dark mode)

/* Cross-chain */
green-600, green-700, green-400 (dark mode)

/* Neutrals */
gray-50, gray-100, gray-200 (light backgrounds)
gray-700, gray-800, gray-900 (dark backgrounds)

/* Semantic */
green-600 (success/complete)
yellow-600 (warning)
red-600 (error/incomplete)
```

### **Animations**
```css
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

Applied to:
- Modal backgrounds: `animate-fadeIn` (200ms)
- Modal content: `animate-slideUp` (300ms)
- View mode banner: `animate-slideUp` (300ms)

---

## 💾 Local Storage Schema

### **Keys**
```typescript
'web3skills_riwot'         // Skills data
'web3skills_darkmode'      // Dark mode preference
'web3skills_policy_accepted' // Policy acceptance flag
```

### **Data Format**
```typescript
// web3skills_riwot
{
  "Python": true,
  "Rust": false,
  "Solidity": true,
  // ... 200+ skills
}

// web3skills_darkmode
true | false

// web3skills_policy_accepted
"true"
```

---

## 🔧 Helper Functions

### **Core Functions**
```typescript
toggleSkill(skill: string)              // Toggle skill on/off
getCategoryProgress(categoryName)       // Calculate category completion
getCareerMatch(careerName)             // Calculate career match %
exportData()                            // Download JSON backup
importData(event)                       // Restore from JSON
generateShareCode()                     // Create share code
loadFromShareCode(code)                 // Load shared profile
copyToClipboard(text)                   // Copy with fallback
```

### **Calculation Logic**

**Category Progress:**
```typescript
checked = skills in category that are true
total = total skills in category
percentage = (checked / total) * 100
```

**Career Match:**
```typescript
matched = requiredSkills that user has
total = total requiredSkills
percentage = (matched / total) * 100
```

**Overall Progress:**
```typescript
checkedSkills = count of all true skills
totalSkills = count of all skills
percentage = (checkedSkills / totalSkills) * 100
```

---

## 🚀 Rendering Logic

### **View Determination**
```typescript
if (currentView === 'home') → <HomePage />
if (currentView === 'skills') → <SkillsView />
if (currentView === 'careers') → <CareersView />
if (currentView === 'career-detail') → <CareerDetailView />
```

### **Modal Display**
```typescript
{showShareModal && <ShareModal />}
{showViewModal && <ViewModal />}
{showPolicyModal && <PolicyModal />}
```

### **Conditional Features**
```typescript
// View mode banner
{viewMode && <ViewModeBanner />}

// Import/Export (hidden in view mode)
{!viewMode && <DataManagement />}

// Checkboxes vs Icons
{!viewMode ? <Checkbox /> : <CheckCircleIcon />}
```

---

## 📱 Responsive Design

### **Breakpoints**
```css
sm: 640px   // Small devices
md: 768px   // Tablets
lg: 1024px  // Desktops
xl: 1280px  // Large screens
```

### **Grid Adaptations**
```typescript
// Skills grid
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Stats
grid-cols-1 md:grid-cols-3

// Careers
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

---

## 🔐 Privacy & Security

### **Data Storage**
- ✅ 100% client-side (localStorage)
- ✅ No server communication
- ✅ No analytics or tracking
- ✅ No cookies
- ✅ User-controlled sharing

### **Share Codes**
- Base64 encoded JSON
- Contains only skill names (no personal data)
- User must explicitly generate and share
- No expiration

---

## 🛠️ Development

### **Tech Stack**
- React 18 (TypeScript)
- Tailwind CSS v4
- Lucide React (icons)
- LocalStorage API

### **Key Files**
- `App.tsx` - All application logic (1900+ lines)
- `styles/globals.css` - Global styles + animations
- `README.md` - User documentation
- `STRUCTURE.md` - This file

### **No Build Configuration**
- Uses default Next.js/Vite setup
- Tailwind v4 auto-detection
- No custom webpack/config needed

---

## 📈 Performance

### **Optimizations**
- Minimal re-renders (proper state management)
- CSS transitions (no JS animations)
- Conditional rendering
- LocalStorage caching
- No external API calls

### **Bundle Size**
- Single component architecture
- Minimal dependencies
- Tree-shakeable icons
- No heavy libraries

---

## 🔄 Future Enhancements

### **Planned Structure Changes**
```
/components/
  ├── Navigation.tsx
  ├── HomePage.tsx
  ├── SkillsView.tsx
  ├── CareersView.tsx
  ├── CareerDetailView.tsx
  ├── modals/
  │   ├── ShareModal.tsx
  │   ├── ViewModal.tsx
  │   └── PolicyModal.tsx
  └── Footer.tsx

/data/
  ├── skillCategories.ts
  ├── careerPaths.ts
  └── types.ts

/utils/
  ├── storage.ts
  ├── calculations.ts
  └── clipboard.ts
```

---

**Built by**: Mir Mohammad Luqman  
**GitHub**: https://github.com/mirmohmmadluqman/web3skills  
**Community**: RiWoT (https://github.com/RiWoT)
